import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from 'src/Entities/Section.entity';
import { Todo } from 'src/Entities/Todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/createTodo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        @InjectRepository(Section)
        private sectionRepository: Repository<Section>
    ){}

    async userHasSection(userId: number, sectionId: number): Promise<boolean> {
        const section = await this.sectionRepository.findOneBy({
            id: sectionId,
            user: {
                userId
            }
        })
        if (!section) return false
        return true
    }

    async createTodo(dto: CreateTodoDto, userId: number): Promise<any>{
        const todo =  this.todoRepository.create({
            content: dto.content,
            dateEnded: dto.date,
            section: dto.section &&  {id: dto.section.id} ,
            title: dto.title,
            user: {userId: userId}

        })

        await this.todoRepository.save(todo)
        return todo
    }

    async deleteTodo(todoId: number, userId: number){

        const result = await this.todoRepository.delete({
            id: todoId,
            user: {
                userId
            }
        })

        if (result.affected === 0) throw new BadRequestException({code: 12})
       
    }


}
