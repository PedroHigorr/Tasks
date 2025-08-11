import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';

import { TaskService } from './services/task.service';
import { UserDto } from './dto/task.dto';
import { IdValidator, TaskDto, TasksValidator } from './dto/task.validation.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTasks(@Body() task: TaskDto){

       const res = await this.taskService.createTask(task);

        return {message: "Task criada com sucesso. \n\n", res }

    }

    @Post('user')
    @HttpCode(HttpStatus.CREATED)
    async createUsers(@Body() user: UserDto){

       const res = await this.taskService.CreateUser(user);
        
        return {message: "Usuário criado com sucesso. \n\n", res}
    }

    @Get('user/:id')
    @HttpCode(HttpStatus.OK)
    async findUser(@Param() user: IdValidator){

        const { id } = user;

        return await this.taskService.findUserById(id);

    }

    @Get('task/:id')
    @HttpCode(HttpStatus.OK)
    async findTask(@Param() task: IdValidator){
        
        const { id } = task;

        return await this.taskService.findTaskById(id);
    }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(@Body() tasks: TasksValidator){

        const {tittle, status} = tasks

        const find = await this.taskService.findMany(tittle, status)

        return {message: "Tasks encontradas: \n", find}
    }

    @Put('Task/:id')
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param() identification: IdValidator, @Body() task: TasksValidator){

        const {tittle, description, status} = task;
        const { id } = identification;

        const att = await this.taskService.updateTask(id, tittle, description, status);

        return {message: "Atualizações realizadas com sucesso!\n\n", att}
    }

    @Delete('task/:id')
    @HttpCode(HttpStatus.OK)
    async deleteTasks(@Param() identification: IdValidator){

        const { id } = identification;
        
        const del = await this.taskService.deleteTask(id);

        return {message: "Task deletada com sucesso.\n\n", del};
    }

}
