import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from "class-validator";
import { Rol } from "../common/enums";

export class RqRegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(72)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Rol)
  readonly rol: Rol;
}
