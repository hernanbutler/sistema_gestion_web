import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { UserEntity } from "@modules/auth/entities";
import { Prioridad, Estado } from "src/common/enum";

@Entity({ name: "actividades" })
export class ActivityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({ name: "id_usuario_original" })
  usuarioOriginal: number;

  @Column({ type: "enum", enum: Prioridad })
  prioridad: Prioridad;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({ name: "id_usuario_actual" })
  usuarioActual: number;

  @UpdateDateColumn({
    type: "timestamp",
    name: "fecha_modificacion",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  fechaModificacion: Date;

  @Column({ type: "enum", enum: Estado, default: Estado.PENDIENTE })
  estado: Estado;
}
