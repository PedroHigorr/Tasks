import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/task.dto';
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

 async CreateUser(user: UserDto){
    
    const data: Prisma.usersCreateInput = {
        name: user.name,
        email: user.email,
    }
    
    return this.db.createUser(data);
 }

 async findTaskById(id: number){

    const taskById = await this.db.findTaskById(id);

    return taskById;
 }

 async findUserById( id: number){

    const userById = await this.db.findUserById(id);

    return userById;
    
 }

 async updateTask(id: number, title, description, status){

   return await this.db.updateTask(id, title, description, status);
   
 }
 
 async deleteTask(id: number){

   return await this.db.deleteTask(id);

 }

 async findMany(description: string, tittle: TaskStatus){

   return await this.db.findAllTasks(description, tittle);

 }

}
