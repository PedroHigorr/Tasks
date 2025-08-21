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
    async findTask(@Param() identification: TittleValidator, @Req() request: Request){
        
        const usr = request.user['sub'];
        const { tittle } = identification;

        return await this.taskService.findOneTask(tittle, usr);
    }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() tasks: TasksValidator, @Req() resquest: Request){

        const usr = resquest.user['sub'];
        const {tittle, status} = tasks

        const find = await this.taskService.findMany(tittle, status, usr)

        return {message: "Tasks encontradas: \n", find}
    }

    @Put('Task/:identificator')
    @HttpCode(HttpStatus.OK)
    async updateTask(@Param() identificator: TittleValidator, @Body() task: TaskValidatorForUpdate, @Req() request: Request){

        const usr = request.user['sub'];

        const { tittle } = identificator;

        const att = await this.taskService.updateTask(tittle, task, usr);

        return {message: "Atualizações realizadas com sucesso!\n\n", att}
    }

    @Delete('task/:tittle')
    @HttpCode(HttpStatus.OK)
    async deleteTasks(@Param() identification: TittleValidator, @Req() request: Request){

        const usr = request.user['sub'];

        const { tittle } = identification;
        
        const del = await this.taskService.deleteTask(tittle, usr);

        return {message: "Task deletada com sucesso.\n\n", del};
    }

}
