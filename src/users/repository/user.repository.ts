import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaService } from "src/shared/prisma/prisma.instance";



@Injectable()
export class UserRepository{
    constructor(private readonly prisma: PrismaService){}

    async createUser(data: Prisma.usersCreateInput){
        try{

            await this.prisma.users.create({data})

        }catch(e){
            
            if( e instanceof PrismaClientKnownRequestError ){

                switch(e.code){
                    case 'P2009':
                        throw new BadRequestException('Dados obrigatórios ausentes.');
                    case 'P2002':
                        throw new ConflictException('Email já cadastrado.');
                    default:
                        throw new InternalServerErrorException('Erro ao criar o usuário\n', e.code);
                }
            }

        throw new InternalServerErrorException('Erro inesperado ao criar usuário. \n', e.message);

        }
    }

    async findUserByEmail(email: string){
        try{

           return await this.prisma.users.findUniqueOrThrow({
                where: {email}
            })

        }catch(e){

            if(e instanceof PrismaClientKnownRequestError){

                switch(e.code){
                    case 'P2025':
                        throw new NotFoundException('Email ou senha inválidas, usuário não encontrado! ');
                    case 'P1001':
                    case 'P1017':
                        throw new InternalServerErrorException('Falha de conexão com o servidor.');
                    default:
                        throw new InternalServerErrorException('Erro ao buscar usuário.');
                }
            }

            throw new InternalServerErrorException('Erro inesperado ao buscar usuário.');
        }
    }
}