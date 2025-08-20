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

 async findTaskById(tittle: string){

    const taskById = await this.db.findTaskByTittle(tittle);

    return taskById;
 }

 async updateTask(tittle, task: TaskValidatorForUpdate){

   return await this.db.updateTask(tittle, task);
   
 }
 
 async deleteTask(tittle: string){

   return await this.db.deleteTask(tittle);

 }

 async findMany(description: string, tittle: TaskStatus){

   return await this.db.findAllTasks(description, tittle);

 }

}
