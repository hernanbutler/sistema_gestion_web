import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { UserEntity } from "@modules/auth/entities";
import { Prioridad, Estado } from "../common/enum";

@Entity({ name: "actividad" })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_usuario_original" })
  usuarioOriginal: number;

  @Column({ type: "enum", enum: Prioridad })
  prioridad: Prioridad;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_usuario_actual" })
  usuarioActual: number;

  @UpdateDateColumn({
    type: "timestamp",
    name: "fecha_modificacion",
  })
  fechaModificacion: Date;

  @Column({ type: "enum", enum: Estado, default: Estado.PENDIENTE })
  estado: Estado;
}
