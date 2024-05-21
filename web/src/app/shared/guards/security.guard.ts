import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '@shared/services/data.service';

export const SecurityGuard: CanActivateFn = (route, state) => {
  const id = route.params['id'];
  const user = inject(DataService).getUser;
  const isAdmin = user.rol === 'ADMINISTRADOR';

  return id == user.id || isAdmin
    ? true
    : inject(Router).createUrlTree(['home/profile/' + user.id]);
};
