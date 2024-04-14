import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Estado, Rol } from "../common/enums";

@Entity({ name: "usuarios" })
export class UserEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 72 })
  clave: string;

  @Column({ nullable: true })
  apellidos?: string;

  @Column({ nullable: true })
  nombres?: string;

  @Column({ default: Estado.ACTIVO })
  estado: Estado;

  @Column({ name: "nombre_usuario", nullable: true })
  nombreUsuario?: string;

  @Column()
  rol: Rol;
}
