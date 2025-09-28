import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

  async loginUser(loginUserDto: LoginUserDTO) {
    const user = await this.userRepository.findOneBy({
      userEmail: loginUserDto.userEmail,
    });
    if (!user) throw new UnauthorizedException('Credentials dont match');
    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );
    if (!match) throw new UnauthorizedException('Credentials dont match');
    const token = this.jwtService.sign({
      email: user.userEmail,
      password: user.userPassword,
      userRoles: user.userRoles,
    });
    return token;
  }
}
