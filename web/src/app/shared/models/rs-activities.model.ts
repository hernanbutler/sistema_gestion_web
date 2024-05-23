import { Estado, Operacion, Prioridad } from '@shared/enums';
import { RsGenericHeader } from './generic-header.model';

export interface RsActivities {
  rsGenericHeaderDto: RsGenericHeader;
  rsGetActivityDataDto: RsActivitiesData[];
}

export interface RsActivitiesData {
  id: number;
  actividad: number;
  descripcion: string;
  usuarioOriginal: number;
  prioridad: Prioridad;
  usuarioActual: number;
  fechaModificacion: string;
  estado: Estado;
  operacion: Operacion;
}