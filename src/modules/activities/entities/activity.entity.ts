import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { UserEntity } from "../../auth/entities";
import { Prioridad, Estado } from "../enum";

@Entity({ name: "actividad" })
export class ActivityEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column({ type: 'enum', enum: Prioridad})
    prioridad: Prioridad;
    
    @Column({ type: 'enum', enum: Estado, default: Estado.PENDIENTE })
    estado: Estado;
    
    @ManyToOne(() => UserEntity, usuario => usuario.id)
    usuario_asignado: UserEntity;
}