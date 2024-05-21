import { RsGenericHeaderDto } from "src/dtos";

export class RsUpdateUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;

  constructor(rsGenericHeaderDto: RsGenericHeaderDto) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
  }
}
