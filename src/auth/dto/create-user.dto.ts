import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { Employee } from 'src/employees/entities/employee.entity';

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

  @IsString({ each: true })
  @IsOptional()
  declare userRoles: string[];

  @IsOptional()
  @IsString()
  declare manager: Manager;

  @IsOptional()
  @IsString()
  declare employee: Employee;
}
