import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RqLoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(72)
  password: string;
}
