import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/Entities/Todo.entity';
import { TokenServiceService } from 'src/token-service/token-service.service';
import { AuthModule } from 'src/auth/auth.module';
import { Section } from 'src/Entities/Section.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
      Section
    ]),
    AuthModule
  ],
  providers: [TodosService, ],
  controllers: [TodosController]
})
export class TodosModule {
  

}
