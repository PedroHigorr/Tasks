import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TaskService } from './services/task.service';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    async create(@Body() task: TaskDto){

        return await this.taskService.createTask(task);

    }

    // @Get('/:id')
    // findById(@Param('id') id:string): TaskDto{
    //     return 0;
    // }
}
