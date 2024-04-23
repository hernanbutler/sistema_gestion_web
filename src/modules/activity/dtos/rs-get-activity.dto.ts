import { RsGenericHeaderDto } from "src/dtos";

import { Estado, Prioridad } from "src/common/enum";

export interface RsActivityDataDto {
  id: number;
  descripcion: string;
  usuarioOriginal: number;
  prioridad: Prioridad;
  usuarioActual: number;
  fechaModificacion: Date;
  estado: Estado;
}

export class RsGetActivityDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsActivityDataDto: RsActivityDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsActivityDataDto: RsActivityDataDto
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsActivityDataDto = rsActivityDataDto;
  }
}
