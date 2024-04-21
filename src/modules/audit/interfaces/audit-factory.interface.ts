import { ActivityEntity } from "@modules/activity/entities";
import { Operacion } from "../common/enums";
import { RqGetAuditDto, RsGetAuditDto, RsGetAuditsDto } from "../dtos";
import { AuditEntity } from "../entities";

export const AUDIT_FACTORY_SERVICE = "AUDIT_FACTORY_SERVICE";

export interface IAuditFactory {
  createGetRequestDTO(id: number): RqGetAuditDto;
  DTORequesttoCreateAuditEntity(
    activityEntity: ActivityEntity,
    operacion: Operacion
  ): AuditEntity;
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
