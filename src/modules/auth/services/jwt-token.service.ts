import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../entities";

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  jwtTokenGenerate(userEntity: UserEntity): string {
    return this.jwtService.sign(userEntity);
  }
}
