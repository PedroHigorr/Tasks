import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [TaskModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
