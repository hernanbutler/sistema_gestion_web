import { Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags ('users')
@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenidos a Nuestra Aplicacion';
  }
  getUsers():string[]{
    return [
      "Hernan",
      "Nico",
      "Luis",
      "Cristian"
    ]
  }
}
