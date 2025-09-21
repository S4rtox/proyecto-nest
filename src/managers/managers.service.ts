import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    return this.managerRepository.save(createManagerDto);
  }

  findAll() {
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({ managerId: id });
    if (!manager)
      throw new NotFoundException(`Manager with ID ${id} not found`);
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
    });

    if (!managerToUpdate)
      throw new NotFoundException(`Manager with ID ${id} not found`);

    return this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.managerRepository.delete({ managerId: id });
    return { message: `Manager with ID ${id} has been removed` };
  }
}
