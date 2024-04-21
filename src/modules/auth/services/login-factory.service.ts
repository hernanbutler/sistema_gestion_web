import { Injectable } from "@nestjs/common";

import { RqLoginUserDto, RsLoginUserDto } from "../dtos";
import { UserEntity } from "../entities";
import { ILoginFactory } from "../interfaces";

@Injectable()
export class LoginFactoryService implements ILoginFactory {
  LoginEntitytoDTOResponse(
    statusCode: number,
    message: string,
    token: string
  ): RsLoginUserDto {
    return new RsLoginUserDto({ statusCode, message }, { token });
  }

  DTORequesttoLoginEntity(rqLoginUserDto: RqLoginUserDto): UserEntity {
    const loginEntity = new UserEntity();
    loginEntity.email = rqLoginUserDto.email;
    loginEntity.password = rqLoginUserDto.password;

    return loginEntity;
  }
}
