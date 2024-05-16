import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { ROLES_KEY } from "src/decorators";
import { Rol } from "@modules/auth/common/enums";
import { DataService } from "@modules/auth/services";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly dataService: DataService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Rol[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = this.dataService.userData;

    return requiredRoles.some((rol) => user.rol.includes(rol));
  }
}
