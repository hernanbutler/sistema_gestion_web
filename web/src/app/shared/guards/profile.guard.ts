import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ProfileComponent } from '@modules/home/profile/profile.component';
import { DataService } from '@shared/services/data.service';

export const ProfileGuard: CanDeactivateFn<ProfileComponent> = (
  component: ProfileComponent
) => {
  const user = inject(DataService);

  if (
    (!user.getUser.nombres || !user.getUser.apellidos) &&
    user.getUser.rol !== 'ADMINISTRADOR'
  ) {
    return (component.isProfiledCompleted = false);
  }
  return true;
};
