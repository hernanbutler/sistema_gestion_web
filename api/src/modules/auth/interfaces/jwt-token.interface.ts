import { UserEntity } from "../entities";

export const JWT_TOKEN_SERVICE = "JWT_TOKEN_SERVICE";

export interface IJwtToken {
  signToken(userEntity: UserEntity): Promise<string>;
  verifyToken(token: string): Promise<any>;
}
