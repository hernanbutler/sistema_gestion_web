import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from '@shared/services/data.service';

export const authGuard: CanActivateFn = async () => {
  const token = sessionStorage.getItem('token');
  const router = inject(Router);
  const user = inject(DataService);

  if (token) {
    user.setUser = new JwtHelperService().decodeToken(token).payload;
    return true;
  } else {
    return router.createUrlTree(['/auth/login']);
  }
};
