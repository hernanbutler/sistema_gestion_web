import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ActivityEntity } from "@modules/activity/entities";
import { Operacion } from "./common/enums";
import { RqGetAuditDto, RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AuditEntity } from "./entities";
import { AUDIT_FACTORY_SERVICE, IAuditFactory } from "./interfaces";

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditEntity)
    private readonly auditRepository: Repository<AuditEntity>,

    @Inject(AUDIT_FACTORY_SERVICE)
    private readonly auditFactoryService: IAuditFactory
  ) {}

  async getAudit(rqGetAuditDto: RqGetAuditDto): Promise<RsGetAuditDto> {
    let getAuditDto: RsGetAuditDto;

    try {
      const auditDB = await this.auditRepository.findOneBy({
        id: rqGetAuditDto.id,
      });

      getAuditDto =
        auditDB !== null
          ? this.auditFactoryService.AuditEntitytoDTOGetAuditResponse(
              HttpStatus.OK,
              "",
              auditDB
            )
          : this.auditFactoryService.AuditEntitytoDTOGetAuditResponse(
              HttpStatus.NOT_FOUND,
              "La auditoria no existe",
              null
            );
    } catch (err) {
      getAuditDto = this.auditFactoryService.AuditEntitytoDTOGetAuditResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener auditoria",
        null
      );
    }

    return getAuditDto;
  }

  async getAudits(): Promise<RsGetAuditsDto> {
    let getAuditsDto: RsGetAuditsDto;

    try {
      const auditsDB = await this.auditRepository.find();

      getAuditsDto = this.auditFactoryService.AuditEntitytoDTOGetAuditsResponse(
        HttpStatus.OK,
        "",
        auditsDB
      );
    } catch (err) {
      getAuditsDto = this.auditFactoryService.AuditEntitytoDTOGetAuditsResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener auditorias",
        null
      );
    }

    return getAuditsDto;
  }

  async createAudit(
    activityEntity: ActivityEntity,
    operacion: Operacion
  ): Promise<void> {
    const auditEntity = this.auditFactoryService.DTORequesttoCreateAuditEntity(
      activityEntity,
      operacion
    );

    await this.auditRepository.save(auditEntity);
  }
}
