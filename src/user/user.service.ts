import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    let user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.email = createUserDto.email;

    //hash password
    const saltRounds = 10;
    const password = createUserDto.password;
    const salt = bcrypt.genSaltSync(saltRounds); 
    const hash = bcrypt.hashSync(password, salt);

    user.password = hash;
    user.role = Constants.ROLES.NORMAL_ROLE;
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string){
    return this.userRepository.findOneOrFail({ where: { email: email } });
  }


  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
