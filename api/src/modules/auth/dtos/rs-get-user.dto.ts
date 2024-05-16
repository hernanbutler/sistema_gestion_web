import { RsGenericHeaderDto } from "src/dtos";

import { Estado, Rol } from "../common/enums";

export interface RsUserDataDto {
  id: number;
  email: string;
  apellidos?: string;
  nombres?: string;
  estado: Estado;
  rol: Rol;
}

export class RsGetUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsUserDataDto: RsUserDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsUserDataDto: RsUserDataDto
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsUserDataDto = rsUserDataDto;
  }
}
