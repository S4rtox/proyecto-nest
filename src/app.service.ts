import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getEquipo(): string {
    return 'Hola Equipo';
  }
}
