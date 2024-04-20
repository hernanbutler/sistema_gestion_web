import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserEntity } from "../entities";
import { IJwtToken } from "../interfaces";

@Injectable()
export class JwtTokenService implements IJwtToken {
  constructor(private readonly jwtService: JwtService) {}

  jwtTokenGenerate(userEntity: UserEntity): string {
    return this.jwtService.sign({ payload: userEntity });
  }
}
