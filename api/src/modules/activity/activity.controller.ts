import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Roles } from "src/decorators";
import { AuthGuard, RolesGuard } from "src/guards";
import { Rol } from "@modules/auth/common/enums";
import {
  RsGetActivityDto,
  RsGetActivitiesDto,
  RqCreateActivityDto,
  RsCreateActivityDto,
  RqUpdateActivityDto,
  RsUpdateActivityDto,
  RsDeleteActivityDto,
} from "./dtos";
import { ActivityService } from "./activity.service";

@ApiTags("Actividad")
@Controller("activity")
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Creación de actividad" })
  @ApiCreatedResponse({
    type: Promise<RsCreateActivityDto>,
  })
  @ApiInternalServerErrorResponse({
    description: "Error al crear actividad",
  })
  async create(
    @Body() rqCreateActivityDto: RqCreateActivityDto
  ): Promise<RsCreateActivityDto> {
    return await this.activityService.create(rqCreateActivityDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Búsqueda de actividad" })
  @ApiOkResponse({
    type: Promise<RsGetActivityDto>,
  })
  @ApiNotFoundResponse({
    description: "La actividad no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener actividad",
  })
  async findOne(@Param("id") id: string): Promise<RsGetActivityDto> {
    return await this.activityService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: "Búsqueda de actividades" })
  @ApiOkResponse({
    type: Promise<RsGetActivitiesDto>,
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener actividad",
  })
  async findAll(): Promise<RsGetActivitiesDto> {
    return await this.activityService.findAll();
  }

  @Patch(":id")
  @ApiOperation({ summary: "Modificación de actividad" })
  @ApiOkResponse({
    type: Promise<RsUpdateActivityDto>,
  })
  @ApiNotFoundResponse({
    description: "La actividad no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener actividad",
  })
  async update(
    @Param("id") id: string,
    @Body() rqUpdateActivityDto: RqUpdateActivityDto
  ): Promise<RsUpdateActivityDto> {
    return await this.activityService.update(+id, rqUpdateActivityDto);
  }

  @Delete(":id")
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Eliminación de actividad" })
  @ApiOkResponse({
    type: Promise<RsDeleteActivityDto>,
  })
  @ApiNotFoundResponse({
    description: "La actividad no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al eliminar actividad",
  })
  async remove(@Param("id") id: string): Promise<RsDeleteActivityDto> {
    return await this.activityService.remove(+id);
  }
}
