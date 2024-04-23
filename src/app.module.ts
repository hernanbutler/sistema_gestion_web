import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ActivityModule } from "./modules/activity/activity.module";
import { AuditModule } from "./modules/audit/audit.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get("DB_HOST"),
        port: +configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASS"),
        database: configService.get("DB_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: configService.get("DB_SYNC").toLowerCase() == "true",
      }),
    }),
    ActivityModule,
    AuditModule,
    AuthModule,
    RouterModule.register([
      {
        path: "activity",
        module: ActivityModule,
      },
      {
        path: "audit",
        module: AuditModule,
      },
      {
        path: "auth",
        module: AuthModule,
      },
    ]),
  ],
})
export class AppModule {}
