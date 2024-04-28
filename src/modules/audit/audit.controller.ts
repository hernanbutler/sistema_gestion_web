import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { Roles } from "src/decorators";
import { AuthGuard, RolesGuard } from "src/guards";
import { Rol } from "@modules/auth/common/enums";
import { RsGetAuditDto, RsGetAuditsDto } from "./dtos";
import { AuditService } from "./audit.service";

@ApiTags("Auditoria")
@Controller("audit")
@Roles(Rol.ADMINISTRADOR)
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get(":id")
  @ApiOperation({ summary: "Búsqueda de auditoria" })
  @ApiOkResponse({
    type: Promise<RsGetAuditDto>,
  })
  @ApiNotFoundResponse({
    description: "La auditoria no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener auditoria",
  })
  async findOne(@Param("id") id: string): Promise<RsGetAuditDto> {
    return await this.auditService.findOne(+id);
  }

  @Get()
  @ApiOperation({ summary: "Búsqueda de auditorias" })
  @ApiOkResponse({
    type: Promise<RsGetAuditsDto>,
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener auditoria",
  })
  async findAll(): Promise<RsGetAuditsDto> {
    return await this.auditService.findAll();
  }
}
