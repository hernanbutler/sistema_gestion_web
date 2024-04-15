import { Module } from "@nestjs/common";
import { ActivityController } from "./activity.controller";
import { ActivityService } from "./activity.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ActivityEntity } from "./entities/activity.entity";


@Module({
    imports: [
        // TypeOrmModule.forFeature([
        //     ActivityEntity
        // ])
    ],
    controllers: [ActivityController],
    providers: [ActivityService],
})

export class ActivityModule{}