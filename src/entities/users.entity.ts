import { EstadoUsuarioEnum } from "src/estadoUsuario/estadoUsuario-enum";
import { Entity, Column , PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class User{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true}) //¿Qué les parece que el e mail sea único por el momento?//
    email: string

    @Column()
    clave: string

    @Column()
    rol: string

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column ({type: 'enum', enum: EstadoUsuarioEnum})
    estado:EstadoUsuarioEnum;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
     fechaCreacion: Date

}