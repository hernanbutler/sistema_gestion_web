import { RqRegisterUserDto, RsRegisterUserDto } from "../dtos";
import { UserEntity } from "../entities";

export const REGISTER_FACTORY_SERVICE = "REGISTER_FACTORY_SERVICE";

export interface IRegisterFactory {
  DTORequesttoRegisterEntity(rqRegisterUserDto: RqRegisterUserDto): UserEntity;
  RegisterEntitytoDTOResponse(
    statusCode: number,
    message: string
  ): RsRegisterUserDto;
}
