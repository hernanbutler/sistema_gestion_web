import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
  ],
})
export class AppModule {}
