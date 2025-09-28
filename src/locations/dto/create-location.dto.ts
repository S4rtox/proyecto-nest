import {
  IsArray,
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsNumber()
  @IsOptional()
  @MaxLength(50)
  locationId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  locationName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  locationAddress: string;

  @IsArray()
  @IsOptional()
  locationLatLng: number[];
}
