import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { Estado, Prioridad } from "src/common/enum";

export class RqCreateActivityDto {
  @ApiProperty({
    type: String,
    description: "descripcion",
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    type: Number,
    description: "usuarioOriginal",
  })
  @IsNotEmpty()
  @IsNumber()
  usuarioOriginal: number;

  @ApiProperty({
    type: String,
    enum: Prioridad,
    description: "prioridad",
  })
  @IsNotEmpty()
  @IsEnum(Prioridad)
  prioridad: Prioridad;

  @ApiProperty({
    type: String,
    enum: Estado,
    description: "estado",
  })
  @IsNotEmpty()
  @IsEnum(Estado)
  estado: Estado;
}
