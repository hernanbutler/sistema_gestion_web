import { ObjectLiteral } from "typeorm";

import { Operacion } from "../common/enums";
import { RsGetAuditDto, RsGetAuditsDto } from "../dtos";
import { AuditEntity } from "../entities";

export const AUDIT_FACTORY_SERVICE = "AUDIT_FACTORY_SERVICE";

export interface IAuditFactory {
  createAuditEntity(data: ObjectLiteral, operacion: Operacion): AuditEntity;
  AuditEntitytoDTOGetAuditResponse(
    statusCode: number,
    message: string,
    audit: AuditEntity
  ): RsGetAuditDto;
  AuditEntitytoDTOGetAuditsResponse(
    statusCode: number,
    message: string,
    audit: AuditEntity[]
  ): RsGetAuditsDto;
}
