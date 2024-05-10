import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";

import { RsGenericHeaderDto } from "src/dtos";
import { JWT_TOKEN_SERVICE, IJwtToken } from "../modules/auth/interfaces";
import { DataService } from "@modules/auth/services";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtTokenService: IJwtToken,

    private readonly dataService: DataService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new RsGenericHeaderDto(
        HttpStatus.UNAUTHORIZED,
        "Usuario no autorizado"
      );
    }

    try {
      const user = await this.jwtTokenService.verifyToken(token);

      this.dataService.userData = user["payload"];
    } catch {
      throw new RsGenericHeaderDto(HttpStatus.UNAUTHORIZED, "Token no válido");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
