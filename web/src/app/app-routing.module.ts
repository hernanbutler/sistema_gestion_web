import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from '@layout/auth/auth.component';
import { HomeComponent } from '@layout/home/home.component';
import { authGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () =>
      import('@layout/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('@layout/home/home.module').then((m) => m.HomeModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
