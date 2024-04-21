import { IsNotEmpty, IsNumber } from "class-validator";

export class RqGetAuditDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
