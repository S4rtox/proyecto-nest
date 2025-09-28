import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail,
    });
    if (!user) throw new UnauthorizedException('Credentials dont match');
    const match = await bcrypt.compare(
      createUserDto.userPassword,
      user.userPassword,
    );
    if (!match) throw new UnauthorizedException('Credentials dont match');
    const token = jwt.sign(JSON.stringify(user), 'SECRETKEY');
    return token;
  }
}
