import { IsPositive } from "class-validator";

export class DeleteTodoDto{
    @IsPositive()
    todoId: number
}