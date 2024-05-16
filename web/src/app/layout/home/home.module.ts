import { NgModule } from '@angular/core';
import { ActivityComponent } from '@modules/home/activity/activity.component';
import { AuditComponent } from '@modules/home/audit/audit.component';
import { ProfileComponent } from '@modules/home/profile/profile.component';
import { UserComponent } from '@modules/home/user/user.component';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

const COMPONENTS: any = [
  ActivityComponent,
  AuditComponent,
  ProfileComponent,
  UserComponent,
];
const MODULES: any = [SharedModule, HomeRoutingModule];

@NgModule({
  declarations: [COMPONENTS],
  imports: [MODULES],
})
export class HomeModule {}
