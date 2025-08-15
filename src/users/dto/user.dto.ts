import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";

export class userValidation{

    @IsNotEmpty()
    @MaxLength(20, {message: "Nome excede o número de caracteres permitido: 20"})
    name: string;
    
    @IsNotEmpty()
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}