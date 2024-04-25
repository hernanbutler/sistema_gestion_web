import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { Roles } from "src/decorators";
import { AuthGuard, RolesGuard } from "src/guards";
import { Rol } from "@modules/auth/common/enums";
import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AuditService } from "./audit.service";

@Controller({ path: "audit" })
@Roles(Rol.ADMINISTRADOR)
@UseInterceptors(ClassSerializerInterceptor)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(@Param("id") id: string): Promise<RsGetAuditDto> {
    return await this.auditService.findOne(+id);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(): Promise<RsGetAuditsDto> {
    return await this.auditService.findAll();
  }
}
