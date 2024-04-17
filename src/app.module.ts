import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants} from './modules/auth/auth.constants';


@Module({
  imports: [
    AuthModule,JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },

    }),
    RouterModule.register([
      {
        
        path: 'auth',
        module: AuthModule,
      },
    ]),
  ],
})
export class AppModule {}
