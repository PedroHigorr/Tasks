import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TaskDto } from './DTO/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService){}

    @Post()
    create(@Body() task: TaskDto){
        this.taskService.create(task);

    }

    @Get('/:id')
    findById(@Param('id') id:string): TaskDto{
        const foundTask = this.taskService.filter(t => t.id === id);
    }
}
