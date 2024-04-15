import { ActivityService } from "./activity.service";
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CrearActividad, UpdateActividad } from "./dtos";

@Controller()
export class ActivityController{
    constructor(private readonly activityService: ActivityService){    }

    @Post()
    crearActividad(@Body() nuevaActividad: CrearActividad){
        return this.activityService.crearActividad(nuevaActividad);
    }

    @Get()
    getActividades(){
        return this.activityService.getActividades();
    }

    @Get(':id')
    getActividad(@Param('id', ParseIntPipe) id:number){
        return this.activityService.getActividad(id);
    }

    @Patch(':id')
    updateActividad(@Param('id', ParseIntPipe) id:number,
        @Body() actividad: UpdateActividad){
        return this.activityService.updateActividad(id, actividad);
    }
}