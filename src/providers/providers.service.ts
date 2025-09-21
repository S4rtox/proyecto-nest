import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providersRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    const provider = this.providersRepository.create(createProviderDto);
    return this.providersRepository.save(provider);
  }

  findAll() {
    return this.providersRepository.find();
  }

  async findByName(name: string) {
    const providers = await this.providersRepository.findBy({
      providerName: Like(`%${name}%`),
    });
    if (!providers) {
      throw new NotFoundException(`Providers with name ${name} not found`);
    }
    return providers;
  }

  findOne(id: string) {
    const provider = this.providersRepository.findOneBy({ providerId: id });
    if (!provider) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providersRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });
    if (!product) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    return this.providersRepository.save(product);
  }

  remove(id: string) {
    this.findOne(id);
    this.providersRepository.delete({ providerId: id });
    return { message: `Provider with ID ${id} has been removed` };
  }
}
