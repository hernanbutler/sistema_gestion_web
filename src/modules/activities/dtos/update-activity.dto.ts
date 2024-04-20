import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { Estado, Prioridad } from "../enum"
import { UserEntity } from "src/modules/auth/entities"

export class UpdateActividadDto{
    @IsNotEmpty()
    @IsString()
    descripcion?: string

    @IsNotEmpty()
    @IsEnum(Prioridad)
    prioridad?: Prioridad

    @IsNotEmpty()
    @IsEnum(Estado)
    estado?: Estado

    @IsNotEmpty()
    usuario_asignado?: UserEntity
}