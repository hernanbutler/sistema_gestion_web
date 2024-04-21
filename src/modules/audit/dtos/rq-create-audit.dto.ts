import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsDate,
} from "class-validator";

import { Operacion } from "../common/enums";
import { Prioridad, Estado } from "src/common/enum";

export class RqCreateAuditDto {
  @IsNotEmpty()
  @IsNumber()
  actividad: number;

  @IsNotEmpty()
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
  @IsDate()
  fechaModificacion: Date;

  @IsNotEmpty()
  @IsEnum(Estado)
  estado: Estado;

  @IsNotEmpty()
  @IsEnum(Operacion)
  operacion: Operacion;
}
