import { IsNotEmpty, IsNumber } from "class-validator";

export class RqGetActivityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
