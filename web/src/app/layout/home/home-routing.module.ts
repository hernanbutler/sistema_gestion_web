import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from '@modules/home/activity/activity.component';
import { AuditComponent } from '@modules/home/audit/audit.component';
import { UserComponent } from '@modules/home/user/user.component';
import { ProfileComponent } from '@modules/home/profile/profile.component';
import { ProfileGuard } from '@shared/guards/profile.guard';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canDeactivate: [ProfileGuard],
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
    redirectTo: 'profile',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
