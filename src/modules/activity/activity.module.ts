import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuditModule } from "@modules/audit/audit.module";
import { ActivityEntity } from "./entities";
import { ACTIVITY_FACTORY_SERVICE } from "./interfaces";
import { ActivityFactoryService } from "./services";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { ActivitySubscriber } from "./activity.subscriber";

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity]), AuditModule],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    ActivitySubscriber,
    {
      useClass: ActivityFactoryService,
      provide: ACTIVITY_FACTORY_SERVICE,
    },
  ],
})
export class ActivityModule {}
