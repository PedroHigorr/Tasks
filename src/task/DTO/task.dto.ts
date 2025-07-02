import { Transform } from "class-transformer";
import { IsNotEmpty, IsUUID, Length, MaxLength } from "class-validator";

export class TaskDto{
    id: string;
    tittle: string;
    description: string;
    status: boolean;
    expirationDate: Date;
}
export class IdValidator{
    @IsNotEmpty()
    @IsUUID()
    id: number
}
export class TasksValidator{
    @IsNotEmpty()
    @Length(1, 100, {message:'O título deve ter entre 1 a 100 caractéres'})
    tittle: String
    
    
    @MaxLength(255, {message: 'A descrição deve conter até no máximo 255 carácteres'})
    description: String

    @Transform()
}