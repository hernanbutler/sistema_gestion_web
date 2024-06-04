import { Estado, Prioridad,  } from '@shared/enums';

export interface RqActivity {
  descripcion: string;
  prioridad: Prioridad;
  estado: Estado;
  usuarioActual: number;
}
