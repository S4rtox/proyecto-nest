import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAllLocations(id: number) {
    return this.employeeRepository.findBy({
      location: {
        locationId: id,
      },
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  findAll() {
    return this.employeeRepository.find();
  }

  findOne(id: string) {
    const employee = this.employeeRepository.findOneBy({ employeeId: id });
    if (!employee)
      throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto,
    });

    if (!employeeToUpdate)
      throw new NotFoundException(`Employee with ID ${id} not found`);

    this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  remove(id: string) {
    this.findOne(id);
    this.employeeRepository.delete(id);
    return {
      message: `Employee with ID ${id} has been deleted`,
    };
  }
}
