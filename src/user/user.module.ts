import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { JwtService } from '@nestjs/jwt'
import { ConfigService } from "@nestjs/config";


@Module({
  imports: [TypeOrmModule.forFeature([
    User,
  ])],
  controllers: [UserController],
  providers: [UserService,JwtService,ConfigService],
  exports: [UserService]
})
export class UserModule {}
