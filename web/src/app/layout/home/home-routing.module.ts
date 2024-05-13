import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from '@modules/home/activity/activity.component';
import { AuditComponent } from '@modules/home/audit/audit.component';
import { UserComponent } from '@modules/home/user/user.component';
import { MyProfileComponent } from '@modules/home/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'activities',
    component: ActivityComponent,
  },
  {
    path: 'audits',
    component: AuditComponent,
  },
  {
    path: '',
    redirectTo: 'my-profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
