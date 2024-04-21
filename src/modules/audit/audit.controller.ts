import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  UseInterceptors,
} from "@nestjs/common";

import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AUDIT_FACTORY_SERVICE, IAuditFactory } from "./interfaces";
import { AuditService } from "./audit.service";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuditController {
  constructor(
    private readonly auditService: AuditService,

    @Inject(AUDIT_FACTORY_SERVICE)
    private readonly auditFactoryService: IAuditFactory
  ) {}

  @Get(":id")
  async getAudit(@Param("id") id: string): Promise<RsGetAuditDto> {
    const rqGetAuditDto = this.auditFactoryService.createGetRequestDTO(
      parseInt(id)
    );
    return await this.auditService.getAudit(rqGetAuditDto);
  }

  @Get()
  async getAudits(): Promise<RsGetAuditsDto> {
    return await this.auditService.getAudits();
  }
}
