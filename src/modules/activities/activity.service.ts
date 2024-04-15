import { Injectable } from "@nestjs/common";
import { CrearActividad, UpdateActividad } from "./dtos";

@Injectable()
export class ActivityService{
    crearActividad(nuevaActividad: CrearActividad){

    }

    getActividades(){

    }

    getActividad(id: number){

    }

    updateActividad(id:number, actividad: UpdateActividad){
        
    }
}