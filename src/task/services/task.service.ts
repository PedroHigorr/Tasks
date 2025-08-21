import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Prisma, TaskStatus } from '@prisma/client';
import { TaskDto, TaskValidatorForUpdate } from '../dto/task.validation.dto';

@Injectable()
export class TaskService {
 constructor(private readonly db: TaskRepository){}

 async createTask(task: TaskDto, userId: string){
   
    const data: Prisma.TasksCreateInput = {
        tittle: task.tittle,
        description: task.description,
        expirationDate: new Date(task.expirationDate + 'T00:00:00Z'),
        status: task.status,
        user: {
            connect: { id: userId },
        },
    }

    return this.db.createTask(data);
    
 }

 async findOneTask(tittle: string, userId: string){

    const taskById = await this.db.findTaskByTittle(tittle, userId);

    return taskById;
 }

 async updateTask(tittle: string, task: TaskValidatorForUpdate, userId: string){

   return await this.db.updateTask(tittle, task, userId);
   
 }
 
 async deleteTask(tittle: string, userId: string){

   return await this.db.deleteTask(tittle, userId);

 }

 async findMany(description: string, tittle: TaskStatus, userId: string){

   return await this.db.findAllTasks(description, tittle, userId);

 }

}
