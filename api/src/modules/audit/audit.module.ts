import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { JWT_TOKEN_SERVICE } from "@modules/auth/interfaces";
import { JwtTokenService } from "@modules/auth/services";
import { AuditEntity } from "./entities";
import { AUDIT_FACTORY_SERVICE } from "./interfaces";
import { AuditFactoryService } from "./services";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";
import { AuthModule } from "@modules/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity]), AuthModule],
  exports: [AuditService],
  controllers: [AuditController],
  providers: [
    AuditService,
    JwtService,
    {
      provide: AUDIT_FACTORY_SERVICE,
      useClass: AuditFactoryService,
    },
    {
      provide: JWT_TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
})
export class AuditModule {}
