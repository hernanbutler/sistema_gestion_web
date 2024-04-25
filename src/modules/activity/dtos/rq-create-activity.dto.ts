import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

import { Estado, Prioridad } from "src/common/enum";

export class RqCreateActivityDto {
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  usuarioOriginal: number;

  @IsNotEmpty()
  @IsEnum(Prioridad)
  prioridad: Prioridad;

  @IsNotEmpty()
  @IsEnum(Estado)
  estado: Estado;
}
