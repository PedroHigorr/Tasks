import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UserEmailValidation, userValidation } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usr: UsersService){}

    @Post()
    @HttpCode(HttpStatus.OK)
    async createUsr(@Body() user: userValidation){
        
       return this.usr.createUser(user);
    }

    // @Get('user/:email')
    // @HttpCode(HttpStatus.OK)
    // async findUser(@Param() user: UserEmailValidation){

    //     const { email } = user;

    //     return await this.usr.FindUserByEmail(email);

    // }

}
