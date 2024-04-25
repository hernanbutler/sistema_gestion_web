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

@Controller("activity")
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(RolesGuard)
  async create(
    @Body() rqCreateActivityDto: RqCreateActivityDto
  ): Promise<RsCreateActivityDto> {
    return await this.activityService.create(rqCreateActivityDto);
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<RsGetActivityDto> {
    return await this.activityService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<RsGetActivitiesDto> {
    return await this.activityService.findAll();
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() rqUpdateActivityDto: RqUpdateActivityDto
  ): Promise<RsUpdateActivityDto> {
    return await this.activityService.update(+id, rqUpdateActivityDto);
  }

  @Delete(":id")
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(RolesGuard)
  async remove(@Param("id") id: string): Promise<RsDeleteActivityDto> {
    return await this.activityService.remove(+id);
  }
}
