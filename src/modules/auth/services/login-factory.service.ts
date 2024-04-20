import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities";
import { RqLoginUserDto, RsLoginUserDto } from "../dtos";
import { ILoginFactory } from "../interfaces/login-factory.interface";

@Injectable()
export class LoginFactoryService implements ILoginFactory {
  LoginEntitytoDTOResponse(
    statusCode: number,
    message: string,
    accessToken: string
  ): RsLoginUserDto {
     return new RsLoginUserDto({accessToken},{statusCode,message})

  }
  DTORequesttoLoginEntity(rqLoginUserDto: RqLoginUserDto): UserEntity {
    const loginEntity = new UserEntity();

    loginEntity.email = rqLoginUserDto.email;
    loginEntity.password = rqLoginUserDto.password;

    return loginEntity;
  }
}
