import { NgModule } from '@angular/core';

import { LoginComponent } from '@modules/auth/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

const COMPONENTS: any = [LoginComponent];
const MODULES: any = [SharedModule, AuthRoutingModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
})
export class AuthModule {}
