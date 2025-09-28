import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Manager } from '../entities/manager.entity';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

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

  @IsObject()
  @IsOptional()
  declare location: Location;

  @IsObject()
  @IsOptional()
  declare user: User;
}
