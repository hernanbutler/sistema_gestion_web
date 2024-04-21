import { IsEnum, IsNumber, IsString } from "class-validator";

import { Estado, Prioridad } from "../common/enum";

export class RqUpdateActivityDto {
  @IsString()
  descripcion?: string;

  @IsEnum(Prioridad)
  prioridad?: Prioridad;

  @IsNumber()
  usuarioActual?: number;

  @IsEnum(Estado)
  estado?: Estado;
}
