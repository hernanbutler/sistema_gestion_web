import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { DataService } from "@modules/auth/services";
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
import { Rol } from "@modules/auth/common/enums";

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,

    @Inject(ACTIVITY_FACTORY_SERVICE)
    private readonly activityFactoryService: IActivityFactory,

    private readonly dataService: DataService
  ) {}

  async create(
    rqCreateActivityDto: RqCreateActivityDto
  ): Promise<RsCreateActivityDto> {
    let activityDto: RsCreateActivityDto;

    try {
      const activityEntity =
        this.activityFactoryService.DTORequesttoCreateActivityEntity(
          rqCreateActivityDto
        );

      const activityDB = await this.activityRepository.save(activityEntity);

      activityDto =
        activityDB !== null
          ? this.activityFactoryService.ActivityEntitytoDTOCreateActivityResponse(
              HttpStatus.CREATED,
              "Actividad creada exitosamente"
            )
          : this.activityFactoryService.ActivityEntitytoDTOCreateActivityResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              "Error al crear actividad"
            );
    } catch {
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
      const user = this.dataService.userData;

      let query = this.activityRepository
        .createQueryBuilder("a")
        .leftJoinAndSelect("a.usuarioActual", "u")
        .where("a.id = :id", { id });

      if (user.rol === Rol.EJECUTOR) {
        query = query.andWhere("a.usuarioActual = :id", { id: user.id });
      }

      const activityDB = await query.getOne();

      activityDto =
        activityDB !== null
          ? this.activityFactoryService.ActivityEntitytoDTOGetActivityResponse(
              HttpStatus.OK,
              "",
              activityDB
            )
          : this.activityFactoryService.ActivityEntitytoDTOGetActivityResponse(
              HttpStatus.NOT_FOUND,
              "La actividad no existe",
              null
            );
    } catch {
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
      const user = this.dataService.userData;

      const activitiesDB =
        user.rol === Rol.EJECUTOR
          ? await this.activityRepository
              .createQueryBuilder("actividad")
              .leftJoinAndSelect("actividad.usuarioActual", "usuarioActual")
              .leftJoinAndSelect("actividad.usuarioOriginal", "usuarioOriginal")
              .where(
                "actividad.usuarioActual = :userId OR actividad.usuarioOriginal = :userId",
                { userId: user.id }
              )
              .getMany()
          : await this.activityRepository.find();

      activityDto =
        this.activityFactoryService.ActivityEntitytoDTOGetActivitiesResponse(
          HttpStatus.OK,
          "",
          activitiesDB
        );
    } catch {
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
      const activity = await this.activityRepository.findOneOrFail({
        where: { id },
      });
      const activityDB = await this.activityRepository.save({
        ...activity,
        ...rqUpdateActivityDto,
      });

      activityDto =
        activityDB !== null
          ? this.activityFactoryService.ActivityEntitytoDTOUpdateActivityResponse(
              HttpStatus.OK,
              ""
            )
          : this.activityFactoryService.ActivityEntitytoDTOUpdateActivityResponse(
              HttpStatus.NOT_FOUND,
              "Error al actualizar actividad"
            );
    } catch {
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
      const activity = await this.activityRepository.findOneOrFail({
        where: { id },
      });
      const activityDB = await this.activityRepository.remove(activity);

      activityDto =
        activityDB !== null
          ? this.activityFactoryService.ActivityEntitytoDTODeleteActivityResponse(
              HttpStatus.OK,
              ""
            )
          : this.activityFactoryService.ActivityEntitytoDTODeleteActivityResponse(
              HttpStatus.NOT_FOUND,
              "La actividad no existe"
            );
    } catch {
      activityDto =
        this.activityFactoryService.ActivityEntitytoDTODeleteActivityResponse(
          HttpStatus.INTERNAL_SERVER_ERROR,
          "Error al eliminar actividad"
        );
    }

    return activityDto;
  }
}
