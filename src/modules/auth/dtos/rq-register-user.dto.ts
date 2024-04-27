import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";

import { Rol } from "../common/enums";

export class RqRegisterUserDto {
  @ApiProperty({
    type: String,
    description: "email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: "password",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(72)
  readonly password: string;

  @ApiProperty({
    type: String,
    enum: Rol,
    description: "rol",
  })
  @IsNotEmpty()
  @IsEnum(Rol)
  readonly rol: Rol;
}
