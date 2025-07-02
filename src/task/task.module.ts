import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './Services/task.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [SharedModule],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
