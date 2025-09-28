import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsUUID('4')
  @IsOptional()
  @MaxLength(50)
  declare userId: string;

  @IsEmail()
  declare userEmail: string;

  @IsString()
  @MinLength(8)
  declare userPassword: string;
}
