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

import { AuthGuard } from "src/guards";
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

@Controller({ path: "activity" })
@UseGuards(AuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
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
  async remove(@Param("id") id: string): Promise<RsDeleteActivityDto> {
    return await this.activityService.remove(+id);
  }
}
