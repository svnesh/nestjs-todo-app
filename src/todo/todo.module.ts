import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { RequestService } from 'src/services/request.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Todo,
    ])
  ],
  controllers: [TodoController],
  providers: [
    TodoService, 
    RequestService, 
    JwtService, 
    ConfigService,
  ]
})
export class TodoModule {}
