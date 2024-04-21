import { RsGenericHeaderDto } from "src/dtos";

import { Estado, Prioridad } from "../../../common/enum";

export interface RsActivitiesDataDto {
  id: number;
  descripcion: string;
  usuarioOriginal: number;
  prioridad: Prioridad;
  usuarioActual: number;
  fechaModificacion: Date;
  estado: Estado;
}

export class RsGetActivitiesDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsActivitiesDataDto: RsActivitiesDataDto[];

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsActivitiesDataDto: RsActivitiesDataDto[]
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsActivitiesDataDto = rsActivitiesDataDto;
  }
}
