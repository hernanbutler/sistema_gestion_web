import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CrearActividadDto, UpdateActividadDto } from "./dtos";
import { ActivityEntity } from "./entities/activity.entity";
import e from "express";

@Injectable()
export class ActivityService{
    constructor(@InjectRepository(ActivityEntity) private actividadRepositorio: Repository<ActivityEntity>){}

    async createActividad(nuevaActividad: CrearActividadDto){
        const existe = await this.actividadRepositorio.findOne({where:
            { descripcion: nuevaActividad.descripcion }
        });

        if(existe){
            return new HttpException('La actividad ya existe', HttpStatus.CONFLICT);
        }

        const actividadNueva = this.actividadRepositorio.create(nuevaActividad);
        
        return this.actividadRepositorio.save(actividadNueva);
    }

    getActividades(){
        return this.actividadRepositorio.find();
    }

    async getActividad(id: number){
        const actividad = await this.actividadRepositorio.findOne({where:
                { id }
        });

        if(!actividad){
            return new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
        }

        return actividad;
    }

    async updateActividad(id:number, actividad: UpdateActividadDto){
        const existe = await this.actividadRepositorio.findOne({where:
            { id }
        });

        if(!existe){
            return new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
        }

        return this.actividadRepositorio.update({id}, actividad);
    }

    async deleteActividad(id: number){
        const existe  = await this.actividadRepositorio.findOne({where:
            { id }
        });

        if(!existe){
            return new HttpException('La actividad no existe', HttpStatus.NOT_FOUND);
        }

        return this.actividadRepositorio.softDelete({id});
    }
}