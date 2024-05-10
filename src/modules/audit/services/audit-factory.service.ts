import { Injectable } from "@nestjs/common";
import { ObjectLiteral } from "typeorm";

import { Operacion } from "../common/enums";
import { RsGetAuditDto, RsGetAuditsDto } from "../dtos";
import { AuditEntity } from "../entities";
import { IAuditFactory } from "../interfaces";

@Injectable()
export class AuditFactoryService implements IAuditFactory {
  createAuditEntity(data: ObjectLiteral, operacion: Operacion): AuditEntity {
    const auditEntity = new AuditEntity();
    auditEntity.actividad = data.id;
    auditEntity.descripcion = data.descripcion;
    auditEntity.usuarioOriginal =
      data.usuarioOriginal.id ?? data.usuarioOriginal;
    auditEntity.prioridad = data.prioridad;
    auditEntity.usuarioActual = data.usuarioActual.id ?? data.usuarioActual;
    auditEntity.estado = data.estado;
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
