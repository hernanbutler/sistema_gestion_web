import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectLiteral, Repository } from "typeorm";

import { RsGenericHeaderDto } from "src/dtos";
import { Operacion } from "./common/enums";
import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
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

  async create(data: ObjectLiteral, operacion: Operacion): Promise<void> {
    try {
      const auditEntity = this.auditFactoryService.createAuditEntity(
        data,
        operacion
      );

      await this.auditRepository.save(auditEntity);
    } catch {
      throw new RsGenericHeaderDto(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al crear auditoria"
      );
    }
  }

  async findOne(id: number): Promise<RsGetAuditDto> {
    let auditDto: RsGetAuditDto;

    try {
      const auditDB = await this.auditRepository.findOneOrFail({
        where: { id },
      });

      auditDto =
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
    } catch {
      auditDto = this.auditFactoryService.AuditEntitytoDTOGetAuditResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener auditoria",
        null
      );
    }

    return auditDto;
  }

  async findAll(): Promise<RsGetAuditsDto> {
    let auditDto: RsGetAuditsDto;

    try {
      const auditsDB = await this.auditRepository.find();

      auditDto = this.auditFactoryService.AuditEntitytoDTOGetAuditsResponse(
        HttpStatus.OK,
        "",
        auditsDB
      );
    } catch {
      auditDto = this.auditFactoryService.AuditEntitytoDTOGetAuditsResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener auditorias",
        null
      );
    }

    return auditDto;
  }
}
