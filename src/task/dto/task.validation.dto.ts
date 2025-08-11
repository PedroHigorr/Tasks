import { Transform, Type } from "class-transformer";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { TaskStatus } from '@prisma/client';


export class IdValidator{
    @IsNotEmpty({message: "O campo id não pode estar em branco."})
    @IsInt({message: "ID fornecido é um valor inválido."})
    @Type(() => Number)
    id: number
}

export class TaskDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(150, {message: "Limite máximo de 150 Caracteres"})
    tittle: string;

    @IsOptional()
    @IsString()
    description: string;

    @Transform(({ value }) => value?.toString().trim().toUpperCase())
    @IsEnum(TaskStatus, {message: 'Status inválido\nEsperado: "PENDING"/"DONE"'})
    status?: TaskStatus;

    @IsNotEmpty()
    @IsDateString()
    expirationDate: Date;

    @IsNotEmpty()
    @IsInt({message: "ID fornecido é um valor inválido."})
    @Type(() => Number)
    userId: number;
}


export class TasksValidator{
    @IsNotEmpty({message: "Deve conter um título."})
    @Length(1, 100, {message:'O título deve ter entre 1 a 100 caractéres'})
    tittle: string
    
    @IsOptional()
    @MaxLength(255, {message: 'A descrição deve conter até no máximo 255 carácteres'})
    description: string

    @Transform(({ value }) => value?.toString().trim().toUpperCase())
    @IsEnum(TaskStatus, {message: 'Status inválido\nEsperado: "PENDING"/"DONE"'})
    status: TaskStatus
   
}

