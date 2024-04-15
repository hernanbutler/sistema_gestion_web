import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "./entities";
import { ENCRYPT_SERVICE, REGISTER_FACTORY_SERVICE } from "./interfaces";
import { EncryptService, RegisterFactoryService } from "./services";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      useClass: EncryptService,
      provide: ENCRYPT_SERVICE,
    },
    {
      useClass: RegisterFactoryService,
      provide: REGISTER_FACTORY_SERVICE,
    },
  ],
})
export class AuthModule {
  constructor(private dataSource: DataSource) {}
}
