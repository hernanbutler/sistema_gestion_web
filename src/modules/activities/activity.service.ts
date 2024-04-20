import { Injectable } from "@nestjs/common";
import { CrearActividadDto, UpdateActividadDto } from "./dtos";

@Injectable()
export class ActivityService{
    crearActividad(nuevaActividad: CrearActividadDto){

    }

    getActividades(){

    }

    getActividad(id: number){

    }

    updateActividad(id:number, actividad: UpdateActividadDto){
        
    }
}