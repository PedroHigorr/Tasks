import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
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
                    default:
                        throw new InternalServerErrorException('Erro ao criar o usuário\n', e.code);
                }
            }

        throw new InternalServerErrorException('Erro inesperado ao criar usuário. \n', e.message);

        }
    }

}