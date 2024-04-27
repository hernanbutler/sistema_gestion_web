import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString } from "class-validator";

import { Estado, Prioridad } from "src/common/enum";

export class RqUpdateActivityDto {
  @ApiProperty({
    type: String,
    description: "descripcion",
  })
  @IsString()
  descripcion?: string;

  @ApiProperty({
    type: String,
    enum: Prioridad,
    description: "prioridad",
  })
  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @ApiProperty({
    type: Number,
    description: "usuarioActual",
  })
  @IsNumber()
  usuarioActual?: number;

  @ApiProperty({
    type: String,
    enum: Estado,
    description: "estado",
  })
  @IsEnum(Estado)
  estado?: Estado;
}
