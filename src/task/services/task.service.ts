import { Injectable } from '@nestjs/common';
import { TaskDto } from '../dto/task.dto';
import { TaskRepository } from '../repository/task.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
 constructor(private readonly tasks: TaskRepository){}

 async createTask(dto: TaskDto){

    const data: Prisma.TasksCreateInput = {
        tittle: dto.tittle,
        description: dto.description,
        expirationDate: dto.expirationDate,
        status: dto.status,
        user: {
            connect: { id: dto.userId },
        },
    }

    return this.tasks.createTask(data);
    
 }
}
