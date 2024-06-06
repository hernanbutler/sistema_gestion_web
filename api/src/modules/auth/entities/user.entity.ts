import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Estado, Rol } from "../common/enums";

@Entity({ name: "usuarios" })
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ length: 72 })
  password: string;

  @Column({ nullable: true })
  apellidos?: string;

  @Column({ nullable: true })
  nombres?: string;

  @Column({ type: "enum", enum: Estado, default: Estado.ACTIVO })
  estado: Estado;

  @Column({ name: "nombre_usuario", nullable: true })
  nombreUsuario?: string;

  @Column({ type: "enum", enum: Rol })
  rol: Rol;

  @Column({ name: "image", nullable: true })
  image?: string;
}
