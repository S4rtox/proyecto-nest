import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Product } from '../entities/product.entity';
import { Provider } from 'src/providers/entities/provider.entity';
export class CreateProductDto extends Product {
  @IsUUID('4')
  @IsOptional()
  @IsString()
  declare productId: string;

  @IsString()
  @MaxLength(40)
  declare productName: string;
  @IsNumber()
  declare price: number;
  @IsInt()
  declare countSeal: number;
  @IsUUID('4')
  @IsString()
  declare provider: Provider;
}
