import { Estado, Prioridad } from '@shared/enums';
import { RsGenericHeader } from './generic-header.model';
import { RsUsersData } from './rs-users.model';

export interface RsActivities {
  rsGenericHeaderDto: RsGenericHeader;
  rsActivitiesDataDto: RsActivitiesData[];
}

export interface RsActivitiesData {
  id: number;
  descripcion: string;
  prioridad: Prioridad;
  fechaModificacion: string;
  estado: Estado;
  usuarioOriginal: RsUsersData;
  usuarioActual: RsUsersData;
}
