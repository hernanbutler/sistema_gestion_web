import { RsGenericHeaderDto } from "./rs-generic-header.dto";

interface RsLoginUserDataDto {
  accessToken: string;
}

export class RsLoginUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsLoginUserDataDto: RsLoginUserDataDto;

  constructor(
    rsLoginUserDataDto: RsLoginUserDataDto,
    rsGenericHeaderDto: RsGenericHeaderDto
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsLoginUserDataDto = rsLoginUserDataDto;
  }
}
