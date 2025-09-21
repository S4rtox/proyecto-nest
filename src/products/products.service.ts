import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const savedProduct = this.productRepository.save(createProductDto);
    return savedProduct;
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({ productId: id });
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.save(product);
  }

  remove(id: string) {
    this.findOne(id);
    this.productRepository.delete({ productId: id });
    return `Product with ID ${id} has been removed`;
  }
}
