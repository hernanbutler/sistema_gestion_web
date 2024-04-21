import { ActivityService } from "./activity.service";
import { Body, Controller, Post, Get, Patch, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { CrearActividadDto, UpdateActividadDto } from "./dtos";

@Controller('actividades')
export class ActivityController{
    constructor(private readonly activityService: ActivityService){    }

    @Post()
    createActividad(@Body() nuevaActividad: CrearActividadDto){
        return this.activityService.createActividad(nuevaActividad);
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
        @Body() actividad: UpdateActividadDto){
        return this.activityService.updateActividad(id, actividad);
    }

    @Delete(':id')
    eliminarActividad(@Param('id', ParseIntPipe) id: number){
        return this.activityService.deleteActividad(id);
    }
}