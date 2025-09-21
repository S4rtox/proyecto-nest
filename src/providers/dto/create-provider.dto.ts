import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
} from 'class-validator';
import { Provider } from '../entities/provider.entity';
import { Product } from 'src/products/entities/product.entity';

export class CreateProviderDto extends Provider {
  @IsUUID('4')
  @IsOptional()
  @IsString()
  declare providerId: string;
  @IsString()
  @MaxLength(100)
  declare providerName: string;
  @IsString()
  @IsEmail()
  declare providerEmail: string;
  @IsString()
  @MaxLength(15)
  @IsOptional()
  declare providerPhone: string;

  @IsOptional()
  declare products: Product[];
}
