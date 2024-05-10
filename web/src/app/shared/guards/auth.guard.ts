import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return localStorage.getItem('token')
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
};
