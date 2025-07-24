import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './services/task.service';
import { SharedModule } from 'src/shared/shared.module';
import { TaskDto } from './dto/task.dto';
import { TaskRepository } from './repository/task.repository';

@Module({
    imports: [SharedModule],
    controllers: [TaskController],
    providers: [TaskService, TaskDto, TaskRepository]
})
export class TaskModule {}
