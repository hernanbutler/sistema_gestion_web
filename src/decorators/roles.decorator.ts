import { SetMetadata } from "@nestjs/common";
import { Rol } from "@modules/auth/common/enums";

export const ROLES_KEY = "roles";

export const Roles = (...roles: Rol[]) => SetMetadata(ROLES_KEY, roles);
