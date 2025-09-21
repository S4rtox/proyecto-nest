import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
//Base del prouyecto nest, del framework
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: +(process.env.port ?? 5432),
      username: 'postgres',
      password: 'odiolagenteafroamericana',
      database: process.env.name?.toString(),
      entities: [],
      synchronize: true,
    }),
    EmployeesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
