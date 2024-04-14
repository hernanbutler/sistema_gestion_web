export interface RsGenericHeaderDto {
  statusCode: number;
  message?: string;
}

export class RsRegisterUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;

  constructor(rsGenericHeaderDto: RsGenericHeaderDto) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
  }
}
