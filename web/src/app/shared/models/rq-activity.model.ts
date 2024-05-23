import { Estado, Prioridad } from '@shared/enums';

export interface RqActivity {
  descripcion: string;
  usuarioActual: number;
  prioridad: Prioridad;
  estado: Estado;
}
