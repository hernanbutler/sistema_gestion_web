import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  RqGetActivityDto,
  RsGetActivityDto,
  RsGetActivitiesDto,
  RsCreateActivityDto,
  RsUpdateActivityDto,
  RqDeleteActivityDto,
  RsDeleteActivityDto,
} from "./dtos";
import { ActivityEntity } from "./entities";
import { ACTIVITY_FACTORY_SERVICE, IActivityFactory } from "./interfaces";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,

    @Inject(ACTIVITY_FACTORY_SERVICE)
    private readonly activityFactoryService: IActivityFactory
  ) {}

  async getActivity(
    rqGetActivityDto: RqGetActivityDto
  ): Promise<RsGetActivityDto> {
    let getActivityDto: RsGetActivityDto;

    try {
      // Implementar Get Activity
    } catch (err) {
      getActivityDto =
        this.activityFactoryService.ActivityEntitytoDTOGetActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al obtener actividad",
          null
        );
    }

    return getActivityDto;
  }

  async getActivities(): Promise<RsGetActivitiesDto> {
    let getActivitiesDto: RsGetActivitiesDto;

    try {
      // Implementar Get Activities
    } catch (err) {
      getActivitiesDto =
        this.activityFactoryService.ActivityEntitytoDTOGetActivitiesResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al obtener actividades",
          null
        );
    }

    return getActivitiesDto;
  }

  async createActivity(
    activityEntity: ActivityEntity
  ): Promise<RsCreateActivityDto> {
    let createActivitiesDto: RsCreateActivityDto;

    try {
      // Implementar Create Activity
    } catch (err) {
      createActivitiesDto =
        this.activityFactoryService.ActivityEntitytoDTOCreateActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al crear actividad"
        );
    }

    return createActivitiesDto;
  }

  async updateActivity(
    id: number,
    activityEntity: ActivityEntity
  ): Promise<RsUpdateActivityDto> {
    let updateActivityDto: RsUpdateActivityDto;

    try {
      // Implementar Update Activity
    } catch (err) {
      updateActivityDto =
        this.activityFactoryService.ActivityEntitytoDTOUpdateActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al actualizar actividad"
        );
    }

    return updateActivityDto;
  }

  async deleteActivity(
    rqDeleteActivityDto: RqDeleteActivityDto
  ): Promise<RsDeleteActivityDto> {
    let deleteActivityDto: RsDeleteActivityDto;

    try {
      // Implementar Delete Activity
    } catch (err) {
      deleteActivityDto =
        this.activityFactoryService.ActivityEntitytoDTODeleteActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al eliminar actividad"
        );
    }

    return deleteActivityDto;
  }
}
