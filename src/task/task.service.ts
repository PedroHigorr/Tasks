import { Injectable } from '@nestjs/common';
import { TaskDto } from './DTO/task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    create(task: TaskDto){
        this.tasks.push(task);
        console.log("Tasks armazenadas: \n",this.tasks);
    }
}
