import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDTO, userAuthValidation } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    singIn(@Body() user: userAuthValidation){

        const { email, password } = user;

        return this.authService.signIn(email, password)
    }

}
