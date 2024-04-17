import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from './entities';
import { ENCRYPT_SERVICE, REGISTER_FACTORY_SERVICE } from './interfaces';
import { EncryptService, RegisterFactoryService} from './services';
import { LOGIN_FACTORY_SERVICE} from './interfaces/login-factory.interface';
import { LoginFactoryService } from './services/login-factory.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_DATABASE'),
        entities: [UserEntity],
        synchronize: configService.get('DB_SYNC').toLowerCase() == 'true',
      }),
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
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
      
    {
      useClass: LoginFactoryService,
      provide: LOGIN_FACTORY_SERVICE,
    }
  ],
})
export class AuthModule {
  constructor(private dataSource: DataSource) {}
}
