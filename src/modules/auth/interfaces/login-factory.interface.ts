import { RqLoginUserDto, RsLoginUserDto } from "../dtos";
import { UserEntity } from "../entities";

export const LOGIN_FACTORY_SERVICE = "LOGIN_FACTORY_SERVICE";

export interface ILoginFactory {
  DTORequesttoLoginEntity(rqLoginDto: RqLoginUserDto): UserEntity;
  LoginEntitytoDTOResponse(
    statusCode: number,
    message: string,
    accessToken: string
  ): RsLoginUserDto;
}
