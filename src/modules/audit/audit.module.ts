import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditEntity } from "./entities";
import { AUDIT_FACTORY_SERVICE } from "./interfaces";
import { AuditFactoryService } from "./services";
import { AuditController } from "./audit.controller";
import { AuditService } from "./audit.service";

@Module({
  imports: [TypeOrmModule.forFeature([AuditEntity])],
  controllers: [AuditController],
  providers: [
    AuditService,
    {
      useClass: AuditFactoryService,
      provide: AUDIT_FACTORY_SERVICE,
    },
  ],
})
export class AuditModule {}
