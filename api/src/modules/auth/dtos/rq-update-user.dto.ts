import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Estado } from "../common/enums";

export class RqUpdateUserDto {
  @ApiProperty({
    type: String,
    description: "apellidos",
  })
  @IsOptional()
  @IsString()
  apellidos?: string;

  @ApiProperty({
    type: String,
    description: "nombres",
  })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiProperty({
    type: Number,
    enum: Estado,
    description: "estado",
  })
  @IsOptional()
  @IsEnum(Estado)
  estado?: Estado;

  @ApiProperty({
    type: String,
    description: "image",
  })
  @IsOptional()
  @IsString()
  image?: string;
}
