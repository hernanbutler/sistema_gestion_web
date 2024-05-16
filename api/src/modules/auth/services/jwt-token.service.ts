import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserEntity } from "../entities";
import { IJwtToken } from "../interfaces";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtTokenService implements IJwtToken {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async signToken(userEntity: UserEntity): Promise<string> {
    return await this.jwtService.signAsync({ payload: userEntity });
  }

  async verifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get("JWT_SECRET_KEY"),
    });
  }
}
