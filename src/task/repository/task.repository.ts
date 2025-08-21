import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma, TaskStatus } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/shared/prisma/prisma.instance";
import { TaskValidatorForUpdate } from "../dto/task.validation.dto";


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
                        throw new NotFoundException('Usuário informado não encontrado.');
                    default:
                        throw new InternalServerErrorException('Erro ao criar Task: \n' + e.message);
                }
            }
        throw new InternalServerErrorException('Erro inesperado ao criar Task. \n', e.message);
        }

    };

    async findTaskByTittle(tittle: string, userId: string){
        
        try{

            const task = await this.prisma.tasks.findFirstOrThrow({
                where: 
                {
                    tittle: tittle,
                    userId: userId
                }
            })

            return task;

        }catch( e ){

            if( e instanceof PrismaClientKnownRequestError){

                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    default:
                        throw new InternalServerErrorException('Falha ao comunicar com o servidor')
                }
            }
        
        throw new InternalServerErrorException('Erro inesperado ao realizar busca por Task. \n', e.message)
        }
    }

    async updateTask(tittle: string, data: TaskValidatorForUpdate, userId: string){

        try {
            
            const att = await this.prisma.tasks.update({
                where: 
                {
                    tittle: tittle, 
                    userId: userId
                },
                data: data
            })

            return att;

        } catch (e) {
            
            if(e instanceof PrismaClientKnownRequestError){
                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    case 'P2002':
                        throw new ConflictException('Task já existe.');
                    case 'P2003':
                        throw new NotFoundException('Usuário informado não encontrado.');

                    default:
                        throw new InternalServerErrorException('Falha ao comunicar com o servidor.')
                }
            }

            throw new InternalServerErrorException('Erro inesperado ao realizar busca por Task. \n', e.message);
        }
    }

    async deleteTask(tittle: string, userId: string){

        try {

            const dlt = await this.prisma.tasks.delete({
                where: 
                {
                    tittle: tittle,
                    userId: userId
                }
            })

            return dlt;

        } catch (e) {

            if(e instanceof PrismaClientKnownRequestError){
                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Task não encontrada.');
                    case 'P2003':
                            throw new NotFoundException('Usuário informado não encontrado.');
                    default:
                        throw new InternalServerErrorException('Falha ao se comunicar com servidor.')
                }
            }
            console.log(e.code,'\n',e.message)
        throw new InternalServerErrorException('falha ao se comunicar com servidor.')
        
        }
    }

    async findAllTasks(tittle: string, status: TaskStatus, userId: string){

        try {
            
            const words = tittle.split(" ") //separa a frase em palavras usando o espaço em branco como separador

            const find = await this.prisma.tasks.findMany({
                where: {
                    userId: userId,
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
            
            if(e instanceof PrismaClientKnownRequestError){

                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Nenhuma task encontrada!');
                    default: 
                        throw new InternalServerErrorException('Um erro ocorreu ao buscar tasks.');
                }
            }

            throw new InternalServerErrorException('Um erro inesperado ocorreu ao efetuar ação.');
        }
    }

}