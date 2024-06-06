import { RsGenericHeader } from './generic-header.model';

export interface RsUsers {
  rsGenericHeaderDto: RsGenericHeader;
  rsUsersDataDto: RsUsersData[];
}

export interface RsUsersData {
  id: number;
  email: string;
  apellidos: string;
  nombres: string;
  estado: number;
  nombreUsuario: string;
  rol: string;
  image: string;
}
