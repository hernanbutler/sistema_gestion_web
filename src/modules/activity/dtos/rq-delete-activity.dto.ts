import { IsNotEmpty, IsNumber } from "class-validator";

export class RqDeleteActivityDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}
