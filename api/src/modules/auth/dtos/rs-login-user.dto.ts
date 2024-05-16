import { RsGenericHeaderDto } from "src/dtos";

export interface RsLoginUserDataDto {
  token: string;
}

export class RsLoginUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsLoginUserDataDto: RsLoginUserDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsLoginUserDataDto: RsLoginUserDataDto
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsLoginUserDataDto = rsLoginUserDataDto;
  }
}
