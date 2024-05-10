import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class RqLoginUserDto {
  @ApiProperty({
    type: String,
    description: "email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "password",
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(72)
  password: string;
}
