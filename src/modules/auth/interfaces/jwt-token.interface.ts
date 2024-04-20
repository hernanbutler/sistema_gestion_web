import { UserEntity } from "../entities";

export const JWT_TOKEN_SERVICE = "JWT_TOKEN_SERVICE";

export interface IJwtToken {
  jwtTokenGenerate(userEntity: UserEntity): string;
}
