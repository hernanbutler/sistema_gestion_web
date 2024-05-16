import { RsGenericHeaderDto } from "src/dtos";

import { Estado, Rol } from "../common/enums";

export interface RsUsersDataDto {
  id: number;
  email: string;
  apellidos?: string;
  nombres?: string;
  estado: Estado;
  rol: Rol;
}

export class RsGetUsersDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsUsersDataDto: RsUsersDataDto[];

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsUsersDataDto: RsUsersDataDto[]
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsUsersDataDto = rsUsersDataDto;
  }
}
