import { IsString,IsDate,IsBoolean } from 'class-validator'

export class CreateTodoDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    updatedAt: Date;

    @IsBoolean()
    completed: boolean
}
