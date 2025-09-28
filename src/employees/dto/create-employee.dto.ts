import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Employee } from '../entities/employee.entity';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Manager } from 'src/managers/entities/manager.entity';
import { Region } from 'src/regions/entities/region.entity';

export class LocationDTO extends Location {
  @IsNumber()
  @IsOptional()
  declare locationId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  declare locationName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  declare locationAddress: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  declare locationLatLng: number[];

  @IsNumber()
  @IsOptional()
  declare manager: Manager;

  @IsArray()
  @IsOptional()
  declare employees: Employee[];

  @IsNumber()
  @IsOptional()
  declare region: Region;
}

export class CreateEmployeeDto extends Employee {
  @IsUUID('4')
  @IsOptional()
  @MaxLength(50)
  declare employeeId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare employeeName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  declare employeeLastName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  declare employeePhoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  declare employeeEmail: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  declare employeePhotoUrl: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  declare location: LocationDTO;

  @IsObject()
  @IsOptional()
  declare user: User;
}
