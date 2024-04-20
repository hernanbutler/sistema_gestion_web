import { Injectable } from "@nestjs/common";

import { UserEntity } from "../entities";
import { RqRegisterUserDto, RsRegisterUserDto } from "../dtos";
import { IRegisterFactory } from "../interfaces";

@Injectable()
export class RegisterFactoryService implements IRegisterFactory {
  DTORequesttoRegisterEntity(rqRegisterUserDto: RqRegisterUserDto): UserEntity {
    const userEntity = new UserEntity();

    userEntity.email = rqRegisterUserDto.email;
    userEntity.password = rqRegisterUserDto.password;
    userEntity.rol = rqRegisterUserDto.rol;

    return userEntity;
  }

  RegisterEntitytoDTOResponse(
    statusCode: number,
    message: string
  ): RsRegisterUserDto {
    return new RsRegisterUserDto({ statusCode, message });
  }
}
