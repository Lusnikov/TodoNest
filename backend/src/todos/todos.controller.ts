import { BadRequestException, Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { ClientUserData } from 'types/types';
import { DeleteTodoDto } from './dto/deleteTodo.dto';

interface RequestWithGuard extends Request {
    userData: ClientUserData
}

@Controller('todos')
export class TodosController {
    constructor(
        private todosService: TodosService
    ){}

    @Post('')
    @UseGuards(JwtAuthGuard)
    async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() request: RequestWithGuard){
        const {
            section
        } = createTodoDto
        const {id} = request.userData

        if (section) {
            const sectionExists = await this.todosService.userHasSection(id, section.id) 
            if (!sectionExists) throw new BadRequestException({code: 11})
        }
        
        const returnedTodo = await this.todosService.createTodo(createTodoDto, id)
        return returnedTodo
    }


    // Принимает id - возвращает его же
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteTodo(@Body() deleteTodoDto: DeleteTodoDto, @Req() request: RequestWithGuard){
        const deleteDto = deleteTodoDto;
        const {id: userId} = request.userData
        await this.todosService.deleteTodo(deleteDto.todoId, userId)
        return deleteDto.todoId
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard)
    updateTodo(){
        return 'update todo'
    }

}
