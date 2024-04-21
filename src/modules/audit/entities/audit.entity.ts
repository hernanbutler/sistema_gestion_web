import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ActivityEntity } from "@modules/activity/entities";
import { UserEntity } from "@modules/auth/entities";
import { Operacion } from "../common/enums";
import { Prioridad, Estado } from "src/common/enum";

@Entity({ name: "actividades_auditoria" })
export class AuditEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @OneToOne(() => ActivityEntity)
  @JoinColumn({ name: "id_actividad" })
  actividad: number;

  @Column()
  descripcion: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "id_usuario_original" })
  usuarioOriginal: number;

  @Column({ type: "enum", enum: Prioridad })
  prioridad: Prioridad;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "id_usuario_Actual" })
  usuarioActual: number;

  @Column({ type: "timestamp", name: "fecha_modificacion" })
  fechaModificacion: Date;

  @Column({ type: "enum", enum: Estado })
  estado: Estado;

  @Column({ type: "enum", enum: Operacion })
  operacion: Operacion;
}
