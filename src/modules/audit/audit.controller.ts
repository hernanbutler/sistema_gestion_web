import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { AuthGuard } from "@guards/auth.guard";
import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AuditService } from "./audit.service";

@Controller({ path: "audit" })
@UseInterceptors(ClassSerializerInterceptor)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(":id")
  @UseGuards(AuthGuard)
  async findOne(@Param("id") id: string): Promise<RsGetAuditDto> {
    return await this.auditService.findOne(+id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(): Promise<RsGetAuditsDto> {
    return await this.auditService.findAll();
  }
}
