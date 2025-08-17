import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDTO } from './dto/auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService){}

    @Post('login')
    singIn(
        @Body('username') username: string, 
        @Body('password') password: string
    ): AuthResponseDTO{
        return this.authService.singIn(username, password)
    }

}
