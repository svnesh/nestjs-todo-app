import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, ClassSerializerInterceptor,  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { AuthGuard } from 'src/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':email')
  findUserByEmail(@Param('email') email: string){
    return this.userService.findUserByEmail(email);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
