import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Employee } from 'src/employees/entities/employee.entity';

export const ApiAuth = () => {
  return applyDecorators(
    ApiResponse({
      status: 403,
      description: 'Missing role',
    }),
    ApiResponse({
      status: 401,
      description: 'Missing or invalid authentication token',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
};
