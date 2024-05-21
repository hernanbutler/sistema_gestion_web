import { Rol } from '@shared/enums';

export interface RqRegisterUser {
  email: string;
  password: string;
  rol: Rol;
}
