import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Region } from '../entities/region.entity';

export class CreateRegionDto extends Region {
  @IsUUID('4')
  @IsOptional()
  declare regionId: string;

  @IsString()
  @MaxLength(100)
  declare regionName: string;

  @IsArray()
  declare regionStates: string[];
}
