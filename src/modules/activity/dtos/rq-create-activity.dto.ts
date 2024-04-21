import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

import { Estado, Prioridad } from "../common/enum";

export class RqCreateActivityDto {
  @IsEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  usuarioOriginal: number;

  @IsNotEmpty()
  @IsEnum(Prioridad)
  prioridad: Prioridad;

  @IsNotEmpty()
  @IsNumber()
  usuarioActual: number;

  @IsNotEmpty()
  @IsEnum(Estado)
  estado: Estado;
}
