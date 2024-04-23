import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from "@nestjs/common";

import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AuditService } from "./audit.service";

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<RsGetAuditDto> {
    return await this.auditService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<RsGetAuditsDto> {
    return await this.auditService.findAll();
  }
}
