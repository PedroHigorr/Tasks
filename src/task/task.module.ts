import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './services/task.service';
import { SharedModule } from 'src/shared/shared.module';
import { TaskRepository } from './repository/task.repository';
import { TaskDto } from './dto/task.validation.dto';

@Module({
    imports: [SharedModule],
    controllers: [TaskController],
    providers: [TaskService, TaskDto, TaskRepository]
})
export class TaskModule {}
