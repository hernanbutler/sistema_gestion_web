import { RsGenericHeaderDto } from "src/dtos/rs-generic-header.dto";

import { Prioridad, Estado } from "src/common/enum";
import { Operacion } from "../common/enums";

export class RsGetAuditsDataDto {
  actividad: number;
  descripcion: string;
  usuarioOriginal: number;
  prioridad: Prioridad;
  usuarioActual: number;
  fechaModificacion: Date;
  estado: Estado;
  operacion: Operacion;

  constructor(
    actividad: number,
    descripcion: Prioridad,
    usuarioOriginal: number,
    prioridad: Prioridad,
    usuarioActual: number,
    fechaModificacion: Date,
    estado: Estado,
    operacion: Operacion
  ) {
    this.actividad = actividad;
    this.descripcion = descripcion;
    this.usuarioOriginal = usuarioOriginal;
    this.prioridad = prioridad;
    this.usuarioActual = usuarioActual;
    this.fechaModificacion = fechaModificacion;
    this.estado = estado;
    this.operacion = operacion;
  }
}

export class RsGetAuditsDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsGetAuditDataDto: RsGetAuditsDataDto[];

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsGetAuditDataDto: RsGetAuditsDataDto[]
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsGetAuditDataDto = rsGetAuditDataDto;
  }
}
