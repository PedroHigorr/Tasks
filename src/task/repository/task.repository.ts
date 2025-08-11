import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma, TaskStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/shared/prisma/prisma.instance";


@Injectable()
export class TaskRepository{
    constructor( private readonly prisma: PrismaService){}

    async createTask(data: Prisma.TasksCreateInput){
        try{
        
            await this.prisma.tasks.create({data});

        }catch(e){

            if( e instanceof PrismaClientKnownRequestError){
                console.error('PRISMA ERROR CODE: ', e.code, '\n\n')

                switch(e.code){
                    case 'P2002':
                        throw new ConflictException('Task já existe.');
                    case 'P2003':
                        throw new BadRequestException('Algum dado fornecido não é válido.');
                    case 'P2009':
                        throw new BadRequestException('Dados inválidos para criação da task.');
                    case 'P2025':
                        throw new NotFoundException('Usuário não encontrado.');
                    default:
                        throw new InternalServerErrorException('Erro ao criar Task: \n' + e.message);
                }
            }
        throw new InternalServerErrorException('Erro inesperado ao criar Task. \n', e.message);
        }

    };

    async createUser(data: Prisma.usersCreateInput){
        try{

            await this.prisma.users.create({data})

        }catch(e){
            
            if( e instanceof PrismaClientKnownRequestError ){

                switch(e.code){
                    case 'P2009':
                        throw new BadRequestException('Dados obrigatórios ausentes.');
                    default:
                        throw new InternalServerErrorException('Erro ao criar o usuário');
                }
            }

        throw new InternalServerErrorException('Erro inesperado ao criar Task. \n', e.message);

        }
    }

    async findUserById(id: number){
        
        try{

            const user = await this.prisma.users.findFirstOrThrow({
                where: {id}
            })
        
            return user; 

        }catch( e ){

            if( e instanceof PrismaClientKnownRequestError){

                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Usuário não encontrado.');
                    case '2016':
                        throw new BadRequestException('Dados inválidos, impossível realizar busca.');
                    default:
                        throw new InternalServerErrorException('Falha ao comunicar com o servidor')
                }
            }
            
        throw new InternalServerErrorException('Erro inesperado ao realizar busca por usuários. \n', e.message)
        }
    }

    async findTaskById(id: number){
        
        try{

            const task = await this.prisma.tasks.findFirstOrThrow({
                where: {id}
            })

            return task;

        }catch( e ){

            if( e instanceof PrismaClientKnownRequestError){

                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    case '2016':
                        throw new BadRequestException('Dados inválidos, impossível realizar busca.');
                    default:
                        throw new InternalServerErrorException('Falha ao comunicar com o servidor')
                }
            }
        
        throw new InternalServerErrorException('Erro inesperado ao realizar busca por Task. \n', e.message)
        }
    }

    async updateTask(id: number, tittle: string, description: string, status: TaskStatus){

        try {
            
            const att = await this.prisma.tasks.update({
                where: {id},
                data: {tittle, description, status}
            })

            return att;

        } catch (e) {
            
            if(e instanceof PrismaClientKnownRequestError){
                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    case '2016':
                        throw new BadRequestException('Dados inválidos, impossível realizar busca.');
                    default:
                        throw new InternalServerErrorException('Falha ao comunicar com o servidor.')
                }
            }

            throw new InternalServerErrorException('Erro inesperado ao realizar busca por Task. \n', e.message);
        }
    }

    async deleteTask(id: number){

        try {

            const dlt = await this.prisma.tasks.delete({
                where: {id}
            })

            return dlt;

        } catch (e) {

            if(e instanceof PrismaClientKnownRequestError){
                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    default:
                        throw new InternalServerErrorException('Falha ao se comunicar com servidor.')
                }
            }
            console.log(e.code,'\n',e.message)
        throw new InternalServerErrorException('falha ao se comunicar com servidor.')
        
        }
    }

    async findAllTasks(tittle: string, status: TaskStatus){

        try {
            
            const words = tittle.split(" ") //separa a frase em palavras usando o espaço em branco como separador

            const find = await this.prisma.tasks.findMany({
                where: { 
                    status: status,
                    OR: words.map(word => ({ //Cria um array de filtros OR
                        tittle:{
                            contains: word,
                            mode: "insensitive"
                        }
                    }))}
            })

            return find;

        } catch (e) {
            
            console.log(e.code,'\n',e.message)
            throw new InternalServerErrorException('erro.')
            // if(e instanceof PrismaClientKnownRequestError){

            //     switch(e.code){
            //         case '':
            //     }
            // }
        }
    }

}