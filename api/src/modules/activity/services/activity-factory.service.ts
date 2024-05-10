import { Injectable } from "@nestjs/common";

import { DataService } from "@modules/auth/services";
import {
  RqCreateActivityDto,
  RsGetActivityDto,
  RsGetActivitiesDto,
  RsCreateActivityDto,
  RsUpdateActivityDto,
  RsDeleteActivityDto,
} from "../dtos";
import { ActivityEntity } from "../entities";
import { IActivityFactory } from "../interfaces";

@Injectable()
export class ActivityFactoryService implements IActivityFactory {
  constructor(private readonly dataService: DataService) {}
  DTORequesttoCreateActivityEntity(
    rqCreateActivityDto: RqCreateActivityDto
  ): ActivityEntity {
    const activityEntity = new ActivityEntity();
    activityEntity.descripcion = rqCreateActivityDto.descripcion;
    activityEntity.usuarioOriginal = this.dataService.userData.id;
    activityEntity.prioridad = rqCreateActivityDto.prioridad;
    activityEntity.usuarioActual = rqCreateActivityDto.usuarioActual;
    activityEntity.estado = rqCreateActivityDto.estado;

    return activityEntity;
  }

  ActivityEntitytoDTOGetActivityResponse(
    statusCode: number,
    message: string,
    activity: ActivityEntity
  ): RsGetActivityDto {
    return new RsGetActivityDto({ statusCode, message }, activity);
  }

  ActivityEntitytoDTOGetActivitiesResponse(
    statusCode: number,
    message: string,
    activity: ActivityEntity[]
  ): RsGetActivitiesDto {
    return new RsGetActivitiesDto({ statusCode, message }, activity);
  }

  ActivityEntitytoDTOCreateActivityResponse(
    statusCode: number,
    message: string
  ): RsCreateActivityDto {
    return new RsCreateActivityDto({ statusCode, message });
  }

  ActivityEntitytoDTOUpdateActivityResponse(
    statusCode: number,
    message: string
  ): RsUpdateActivityDto {
    return new RsUpdateActivityDto({ statusCode, message });
  }

  ActivityEntitytoDTODeleteActivityResponse(
    statusCode: number,
    message: string
  ): RsDeleteActivityDto {
    return new RsDeleteActivityDto({ statusCode, message });
  }
}
