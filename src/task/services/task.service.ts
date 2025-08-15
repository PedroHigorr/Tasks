import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Prisma, TaskStatus } from '@prisma/client';
import { TaskDto } from '../dto/task.validation.dto';

@Injectable()
export class TaskService {
 constructor(private readonly db: TaskRepository){}

 async createTask(task: TaskDto){
   
    const data: Prisma.TasksCreateInput = {
        tittle: task.tittle,
        description: task.description,
        expirationDate: new Date(task.expirationDate + 'T00:00:00Z'),
        status: task.status,
        user: {
            connect: { id: task.userId },
        },
    }

    return this.db.createTask(data);
    
 }

 async findTaskById(id: string){

    const taskById = await this.db.findTaskById(id);

    return taskById;
 }

 async findUserById( id: string){

    const userById = await this.db.findUserById(id);

    return userById;
    
 }

 async updateTask(id: string, title, description, status){

   return await this.db.updateTask(id, title, description, status);
   
 }
 
 async deleteTask(id: string){

   return await this.db.deleteTask(id);

 }

 async findMany(description: string, tittle: TaskStatus){

   return await this.db.findAllTasks(description, tittle);

 }

}
