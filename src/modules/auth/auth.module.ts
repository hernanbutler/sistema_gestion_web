import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities";
import {
  ENCRYPT_SERVICE,
  JWT_TOKEN_SERVICE,
  LOGIN_FACTORY_SERVICE,
  REGISTER_FACTORY_SERVICE,
} from "./interfaces";
import {
  EncryptService,
  JwtTokenService,
  LoginFactoryService,
  RegisterFactoryService,
} from "./services";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET_KEY"),
        signOptions: {
          expiresIn: configService.get("JWT_EXPIRESION_KEY"),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: ENCRYPT_SERVICE,
      useClass: EncryptService,
    },
    {
      provide: JWT_TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
    {
      provide: REGISTER_FACTORY_SERVICE,
      useClass: RegisterFactoryService,
    },

    {
      useClass: LoginFactoryService,
      provide: LOGIN_FACTORY_SERVICE,
    },
  ],
})
export class AuthModule {}
