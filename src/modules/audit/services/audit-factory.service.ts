import { Injectable } from "@nestjs/common";

import { ActivityEntity } from "@modules/activity/entities";
import { Operacion } from "../common/enums";
import { RqGetAuditDto, RsGetAuditDto, RsGetAuditsDto } from "../dtos";
import { AuditEntity } from "../entities";
import { IAuditFactory } from "../interfaces";

@Injectable()
export class AuditFactoryService implements IAuditFactory {
  createGetRequestDTO(id: number): RqGetAuditDto {
    return new RqGetAuditDto(id);
  }

  DTORequesttoCreateAuditEntity(
    activityEntity: ActivityEntity,
    operacion: Operacion
  ): AuditEntity {
    const auditEntity = new AuditEntity();
    auditEntity.actividad = activityEntity.id;
    auditEntity.descripcion = activityEntity.descripcion;
    auditEntity.usuarioOriginal = activityEntity.usuarioOriginal;
    auditEntity.prioridad = activityEntity.prioridad;
    auditEntity.usuarioActual = activityEntity.usuarioActual;
    auditEntity.fechaModificacion = activityEntity.fechaModificacion;
    auditEntity.estado = activityEntity.estado;
    auditEntity.operacion = operacion;

    return auditEntity;
  }

  AuditEntitytoDTOGetAuditResponse(
    statusCode: number,
    message: string,
    audit: AuditEntity
  ): RsGetAuditDto {
    return new RsGetAuditDto({ statusCode, message }, audit);
  }

  AuditEntitytoDTOGetAuditsResponse(
    statusCode: number,
    message: string,
    audit: AuditEntity[]
  ): RsGetAuditsDto {
    return new RsGetAuditsDto({ statusCode, message }, audit);
  }
}
