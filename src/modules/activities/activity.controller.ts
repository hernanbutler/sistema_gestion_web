import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Inject,
  Patch,
} from "@nestjs/common";

import {
  RsGetActivityDto,
  RsGetActivitiesDto,
  RqCreateActivityDto,
  RsCreateActivityDto,
  RqUpdateActivityDto,
  RsUpdateActivityDto,
  RsDeleteActivityDto,
} from "./dtos";
import { ACTIVITY_FACTORY_SERVICE, IActivityFactory } from "./interfaces";
import { ActivityService } from "./activity.service";

@Controller()
export class ActivityController {
  constructor(
    private readonly activityService: ActivityService,

    @Inject(ACTIVITY_FACTORY_SERVICE)
    private readonly activityFactoryService: IActivityFactory
  ) {}

  @Get(":id")
  async getActivity(@Param("id") id: string): Promise<RsGetActivityDto> {
    const rqGetActivityDto = this.activityFactoryService.createGetRequestDTO(
      parseInt(id)
    );
    return await this.activityService.getActivity(rqGetActivityDto);
  }

  @Get()
  async getActivities(): Promise<RsGetActivitiesDto> {
    return await this.activityService.getActivities();
  }

  @Post()
  async createActivity(
    @Body() rqCreateActivityDto: RqCreateActivityDto
  ): Promise<RsCreateActivityDto> {
    const activityData =
      this.activityFactoryService.DTORequesttoCreateActivityEntity(
        rqCreateActivityDto
      );
    return await this.activityService.createActivity(activityData);
  }

  @Patch(":id")
  async updateActivity(
    @Param("id") id: string,
    @Body() rqUpdateActivityDto: RqUpdateActivityDto
  ): Promise<RsUpdateActivityDto> {
    const activityData =
      this.activityFactoryService.DTORequesttoUpdateActivityEntity(
        rqUpdateActivityDto
      );
    return await this.activityService.updateActivity(
      parseInt(id),
      activityData
    );
  }

  @Delete(":id")
  async deleteActivity(@Param("id") id: string): Promise<RsDeleteActivityDto> {
    const RqDeleteActivityDto =
      this.activityFactoryService.createDeleteRequestDTO(parseInt(id));
    return await this.activityService.deleteActivity(RqDeleteActivityDto);
  }
}
