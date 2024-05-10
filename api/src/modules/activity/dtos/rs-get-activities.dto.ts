import { Estado, Prioridad } from "src/common/enum";
import { RsGenericHeaderDto } from "src/dtos";

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
