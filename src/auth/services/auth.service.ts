import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDTO } from '../dto/auth.dto';
import { UsersService } from 'src/users/services/users.service';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService 
{

    private jwtExpirationRimeInSeconds: number;

    constructor (
        private readonly userService: UsersService,
        private readonly jwtSerivce: JwtService,
        private readonly configService: ConfigService
    ) { this.jwtExpirationRimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')}

    async singIn(email: string, password: string){

         const user = await this.userService.FindUserByEmail(email);

        if(!bcryptCompareSync(password, user.password)){

            throw new UnauthorizedException('Email ou senha inválidos.')
        }

        const payload = {sub: user.id, name: user.name, };

        const token = this.jwtSerivce.sign(payload);
     
        return {token, expireIn: this.jwtExpirationRimeInSeconds}
    }
}
