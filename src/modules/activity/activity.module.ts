import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ActivityEntity } from "./entities";
import { ACTIVITY_FACTORY_SERVICE } from "./interfaces";
import { ActivityFactoryService } from "./services";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    {
      useClass: ActivityFactoryService,
      provide: ACTIVITY_FACTORY_SERVICE,
    },
  ],
})
export class ActivityModule {}
