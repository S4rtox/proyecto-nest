import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
      id: 0,
      name: 'Alberto',
      lastName: 'García',
      phoneNumber: '123456789',
    },
    {
      id: 1,
      name: 'Juan',
      lastName: 'Pérez',
      phoneNumber: '987654321',
    },
  ];

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length;
    this.employees.push(createEmployeeDto);
    return this.employees;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    return this.employees.find((employee) => employee.id === id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = this.findOne(id);
    if (!employee) return this.employees;
    const updatedEmployee = { ...employee, ...updateEmployeeDto };
    this.employees = this.employees.map((emp) =>
      emp.id === id ? updatedEmployee : emp,
    );
    return this.employees;
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
