import { Module } from '@nestjs/common';
import { UsersController } from './services/users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository]
})
export class UsersModule {}
