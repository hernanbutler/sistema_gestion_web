import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@shared/services/auth.service';
import { DataService } from '@shared/services/data.service';
import { Observable } from 'rxjs';

export const AuthGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const token = inject(AuthService).authenticated();
  inject(DataService).setUser = new JwtHelperService().decodeToken(
    token
  ).payload;
  return token ? true : inject(Router).createUrlTree(['/auth/login']);
};
