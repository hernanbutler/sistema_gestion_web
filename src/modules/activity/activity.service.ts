import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  RsGetActivityDto,
  RsGetActivitiesDto,
  RsCreateActivityDto,
  RsUpdateActivityDto,
  RsDeleteActivityDto,
  RqCreateActivityDto,
  RqUpdateActivityDto,
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

  async create(
    rqCreateActivityDto: RqCreateActivityDto
  ): Promise<RsCreateActivityDto> {
    let activityDto: RsCreateActivityDto;

    try {
      // Implementar Create
    } catch (err) {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTOCreateActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al crear actividad"
        );
    }

    return activityDto;
  }

  async findOne(id: number): Promise<RsGetActivityDto> {
    let activityDto: RsGetActivityDto;

    try {
      // Implementar FindOne
    } catch (err) {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTOGetActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al obtener actividad",
          null
        );
    }

    return activityDto;
  }

  async findAll(): Promise<RsGetActivitiesDto> {
    let activityDto: RsGetActivitiesDto;

    try {
      // Implementar FindAll
    } catch (err) {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTOGetActivitiesResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al obtener actividades",
          null
        );
    }

    return activityDto;
  }

  async update(
    id: number,
    rqUpdateActivityDto: RqUpdateActivityDto
  ): Promise<RsUpdateActivityDto> {
    let activityDto: RsUpdateActivityDto;

    try {
      // Implementar Update
    } catch (err) {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTOUpdateActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al actualizar actividad"
        );
    }

    return activityDto;
  }

  async remove(id: number): Promise<RsDeleteActivityDto> {
    let activityDto: RsDeleteActivityDto;

    try {
      // Implementar Remove
    } catch (err) {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTODeleteActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al eliminar actividad"
        );
    }

    return activityDto;
  }
}
