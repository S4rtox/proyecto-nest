import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepository: Repository<Region>,
  ) {}

  create(createRegionDto: CreateRegionDto) {
    const region = this.regionRepository.save(createRegionDto);
    return region;
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: string) {
    const region = this.regionRepository.findOneBy({ regionId: id });
    if (!region) throw new NotFoundException(`Region with ID ${id} not found`);
    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const regionToUpdate = await this.regionRepository.preload({
      regionId: id,
      ...updateRegionDto,
    });

    if (!regionToUpdate)
      throw new NotFoundException(`Region with ID ${id} not found`);

    this.regionRepository.save(regionToUpdate);
    return regionToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.regionRepository.delete(id);
    return {
      message: `Region with ID ${id} has been deleted`,
    };
  }
}
