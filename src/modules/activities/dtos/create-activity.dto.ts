import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Estado, Prioridad } from "../enum"
import { UserEntity } from "src/modules/auth/entities"

export class CrearActividadDto{
    @IsNotEmpty({
        message: 'Debe agregar una descripción.'
    })
    @IsString()
    descripcion: string

    @IsNotEmpty({
        message: 'Debe seleccionar una prioridad.'
    })
    @IsEnum(Prioridad)
    prioridad: Prioridad

    @IsNotEmpty()
    @IsEnum(Estado)
    estado: Estado

    @IsNotEmpty({
        message: 'Debe asignar un usuario a la actividad.'
    })
    usuario_asignado: UserEntity
}