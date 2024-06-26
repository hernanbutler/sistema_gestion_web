import { RsGetUserDto, RsGetUsersDto, RsUpdateUserDto } from "../dtos";
import { UserEntity } from "../entities";

export const USER_FACTORY_SERVICE = "USER_FACTORY_SERVICE";

export interface IUserFactory {
  UserEntitytoDTOGetUserResponse(
    statusCode: number,
    message: string,
    user: UserEntity
  ): RsGetUserDto;

  UserEntitytoDTOGetUsersResponse(
    statusCode: number,
    message: string,
    user: UserEntity[]
  ): RsGetUsersDto;

  UserEntitytoDTOUpdateUserResponse(
    statusCode: number,
    message: string
  ): RsUpdateUserDto;
}
