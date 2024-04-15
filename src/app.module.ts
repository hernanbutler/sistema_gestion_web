import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { ActivityModule } from './modules/activities/activity.module';

@Module({
  imports: [
    AuthModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
    ActivityModule,
  ],
})
export class AppModule {}
