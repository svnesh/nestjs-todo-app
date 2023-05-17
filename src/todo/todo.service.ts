import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestService } from 'src/services/request.service';


@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    private readonly requestService: RequestService,
  ){}

  create(createTodoDto: CreateTodoDto) {
    let todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto?.description;
    todo.createdBy = this.requestService.getUser();
    return this.todoRepository.save(todo);
  }

  findByUserId(id: number) {
    return this.todoRepository.find({
      where: { createdBy: { id: id }},
    })    
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({
      id: id
    })
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(
      { id: id }, 
      { 
        title: updateTodoDto.title,
        description: updateTodoDto.description,
        completed: updateTodoDto.completed,
        updatedAt: new Date().toLocaleString()
      })
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
