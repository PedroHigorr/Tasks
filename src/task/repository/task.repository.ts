import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error } from "console";
import { PrismaService } from "src/shared/prisma/prisma.instance";


@Injectable()
export class TaskRepository{
    constructor( private readonly prisma: PrismaService){}

    async createTask(data: Prisma.TasksCreateInput){
        try{
        
            const create_task = await this.prisma.tasks.create({data});

        }catch(e){

            if( e instanceof PrismaClientKnownRequestError){
                switch(e.code){
                    case 'P2002':
                        throw new Error('Task já existe.');
                    case 'P2003':
                        throw new Error('Usuário não encontrado.');
                    case 'P2009':
                        throw new Error('Dados inválidos para criação da task.');
                    default:
                        throw new Error('Erro ao criar Task: \n' + e.message);
                }
            }
        throw e
        }
    };

}