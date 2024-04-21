import {
  RqGetActivityDto,
  RqDeleteActivityDto,
  RqCreateActivityDto,
  RqUpdateActivityDto,
  RsGetActivityDto,
  RsGetActivitiesDto,
  RsCreateActivityDto,
  RsUpdateActivityDto,
  RsDeleteActivityDto,
} from "../dtos";
import { ActivityEntity } from "../entities";

export const ACTIVITY_FACTORY_SERVICE = "ACTIVITY_FACTORY_SERVICE";

export interface IActivityFactory {
  createGetRequestDTO(id: number): RqGetActivityDto;
  createDeleteRequestDTO(id: number): RqDeleteActivityDto;
  DTORequesttoCreateActivityEntity(
    rqCreateActivityDto: RqCreateActivityDto
  ): ActivityEntity;
  DTORequesttoUpdateActivityEntity(
    rqUpdateActivityDto: RqUpdateActivityDto
  ): ActivityEntity;
  ActivityEntitytoDTOGetActivityResponse(
    statusCode: number,
    message: string,
    activity: ActivityEntity
  ): RsGetActivityDto;
  ActivityEntitytoDTOGetActivitiesResponse(
    statusCode: number,
    message: string,
    activity: ActivityEntity[]
  ): RsGetActivitiesDto;
  ActivityEntitytoDTOCreateActivityResponse(
    statusCode: number,
    message: string
  ): RsCreateActivityDto;
  ActivityEntitytoDTOUpdateActivityResponse(
    statusCode: number,
    message: string
  ): RsUpdateActivityDto;
  ActivityEntitytoDTODeleteActivityResponse(
    statusCode: number,
    message: string
  ): RsDeleteActivityDto;
}
