import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Product 1',
      price: 100,
      countSeal: 10,
      provider: 'Provider 1',
    },
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return this.products;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.productId === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  findByProvider(provider: string) {
    const products = this.products.filter(
      (product) => product.provider === provider,
    );
    if (products.length === 0) {
      throw new NotFoundException(`No products found for provider ${provider}`);
    }
    return products;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    product = {
      ...product,
      ...updateProductDto,
    };
    this.products = this.products.map((p) =>
      p.productId === id ? product : p,
    );
    return product;
  }

  remove(id: string) {
    this.findOne(id);
    this.products = this.products.filter((product) => product.productId !== id);
    return this.products;
  }
}
