import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from '../users.service';
import { userValidation } from '../dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usr: UsersService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createUsr(@Body() user: userValidation){
        
       return this.usr.createUser(user);
    }
}
