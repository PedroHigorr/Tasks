import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { TaskService } from './services/task.service';
import { TaskDto, TasksValidator, TaskValidatorForUpdate, TittleValidator } from './dto/task.validation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createTasks(@Body() task: TaskDto, @Req() request: Request){
        
        const usr = request.user['sub'];

        const res = await this.taskService.createTask(task, usr);

        return {message: "Task criada com sucesso. \n\n", res }

    }


    @Get('task/:tittle')
    @HttpCode(HttpStatus.OK)
    async findTask(@Param() identification: TittleValidator){
        
        const { tittle } = identification;

        return await this.taskService.findTaskById(tittle);
    }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() tasks: TasksValidator){

        const {tittle, status} = tasks

        const find = await this.taskService.findMany(tittle, status)

        return {message: "Tasks encontradas: \n", find}
    }

    @Put('Task/:identificator')
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param() identificator: TittleValidator, @Body() task: TaskValidatorForUpdate){

        const { tittle } = identificator;

        const att = await this.taskService.updateTask(tittle, task);

        return {message: "Atualizações realizadas com sucesso!\n\n", att}
    }

    @Delete('task/:tittle')
    @HttpCode(HttpStatus.OK)
    async deleteTasks(@Param() identification: TittleValidator){

        const { tittle } = identification;
        
        const del = await this.taskService.deleteTask(tittle);

        return {message: "Task deletada com sucesso.\n\n", del};
    }

}
