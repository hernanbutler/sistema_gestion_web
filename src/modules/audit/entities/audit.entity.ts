import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Operacion } from "../common/enums";
import { Prioridad, Estado } from "src/common/enum";

@Entity({ name: "actividades_auditoria" })
export class AuditEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "id_actividad" })
  actividad: number;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ name: "id_usuario_original" })
  usuarioOriginal: number;

  @Column({ type: "enum", enum: Prioridad })
  prioridad: Prioridad;

  @Column({ name: "id_usuario_Actual" })
  usuarioActual: number;

  @CreateDateColumn({
    type: "timestamp",
    name: "fecha_modificacion",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  fechaModificacion: Date;

  @Column({ type: "enum", enum: Estado })
  estado: Estado;

  @Column({ type: "enum", enum: Operacion })
  operacion: Operacion;
}
