import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Manager } from '../entities/manager.entity';

export class CreateManagerDto extends Manager {
  @IsUUID('4')
  @IsOptional()
  @MaxLength(50)
  declare managerId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  declare managerFullName: string;

  @IsNumber()
  @IsNotEmpty()
  declare managerSalary: number;

  @IsString()
  @IsEmail()
  declare managerEmail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  declare managerPhoneNumber: string;
}
