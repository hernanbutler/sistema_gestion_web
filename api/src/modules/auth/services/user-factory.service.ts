import { Injectable } from "@nestjs/common";

import { UserEntity } from "../entities";
import { IUserFactory } from "../interfaces";
import { RsGetUserDto, RsGetUsersDto, RsUpdateUserDto } from "../dtos";

@Injectable()
export class UserFactoryService implements IUserFactory {
  UserEntitytoDTOGetUserResponse(
    statusCode: number,
    message: string,
    user: UserEntity
  ): RsGetUserDto {
    return new RsGetUserDto({ statusCode, message }, user);
  }

  UserEntitytoDTOGetUsersResponse(
    statusCode: number,
    message: string,
    users: UserEntity[]
  ): RsGetUsersDto {
    return new RsGetUsersDto({ statusCode, message }, users);
  }

  UserEntitytoDTOUpdateUserResponse(
    statusCode: number,
    message: string
  ): RsUpdateUserDto {
    return new RsUpdateUserDto({ statusCode, message });
  }
}
