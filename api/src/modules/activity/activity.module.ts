import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditModule } from "@modules/audit/audit.module";
import { JWT_TOKEN_SERVICE } from "@modules/auth/interfaces";
import { JwtTokenService } from "@modules/auth/services";
import { ActivityEntity } from "./entities";
import { ACTIVITY_FACTORY_SERVICE } from "./interfaces";
import { ActivityFactoryService } from "./services";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { ActivitySubscriber } from "./activity.subscriber";
import { AuthModule } from "@modules/auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity]),
    AuthModule,
    AuditModule,
  ],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivitySubscriber,
    JwtService,
    {
      provide: ACTIVITY_FACTORY_SERVICE,
      useClass: ActivityFactoryService,
    },
    {
      provide: JWT_TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
})
export class ActivityModule {}
