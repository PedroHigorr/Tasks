import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsUUID, Length, MaxLength } from "class-validator";
import { TaskStatus } from '@prisma/client';


export class IdValidator{
    @IsNotEmpty()
    @IsUUID()
    id: string
}
export class TasksValidator{
    @IsNotEmpty()
    @Length(1, 100, {message:'O título deve ter entre 1 a 100 caractéres'})
    tittle: string
    
    
    @MaxLength(255, {message: 'A descrição deve conter até no máximo 255 carácteres'})
    description: string

    @Transform(({ value }) => value?.toString().trim().toUpperCase())
    @IsEnum(TaskStatus, {message: 'Status inválido\nEsperado: "PENDING"/"DONE"'})
    status: TaskStatus

    
}