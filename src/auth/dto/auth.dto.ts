import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class AuthResponseDTO{
    token: string;
    expireIn: number;
}

export class userAuthValidation {

    @IsNotEmpty()
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}