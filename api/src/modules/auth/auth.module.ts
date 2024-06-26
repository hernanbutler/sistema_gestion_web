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
  USER_FACTORY_SERVICE,
} from "./interfaces";
import {
  DataService,
  EncryptService,
  JwtTokenService,
  LoginFactoryService,
  RegisterFactoryService,
  UserFactoryService,
} from "./services";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

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
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: "./uploads",
          filename: (req, file, callback) => {
            const id = req.params.id;
            const fileExtName = extname(file.originalname);
            const newFilename = `${id}${fileExtName}`;
            callback(null, newFilename);
          },
        }),
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [DataService],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    DataService,
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
    {
      useClass: UserFactoryService,
      provide: USER_FACTORY_SERVICE,
    },
  ],
})
export class AuthModule {}
