import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: uuid(),
      name: 'Alberto',
      lastName: 'García',
      phoneNumber: '123456789',
    },
    {
      id: uuid(),
      name: 'Juan',
      lastName: 'Pérez',
      phoneNumber: '987654321',
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.find((employee) => employee.id === id);
    if (!employee)
      throw new NotFoundException(`Employee with ID ${id} not found`);
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.findOne(id);
    const updatedEmployee = { ...employee, ...updateEmployeeDto };
    this.employees = this.employees.map((emp) =>
      emp.id === id ? updatedEmployee : emp,
    );
    return this.employees;
  }

  remove(id: string) {
    this.findOne(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
