import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { RqLoginUserDto, RsLoginUserDto } from "./dtos";
import { UserEntity } from "./entities";
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  IJwtToken,
  ILoginFactory,
  JWT_TOKEN_SERVICE,
  LOGIN_FACTORY_SERVICE,
} from "./interfaces";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(ENCRYPT_SERVICE)
    private readonly encryptService: IEncrypt,

    @Inject(JWT_TOKEN_SERVICE)
    private readonly jwtTokenService: IJwtToken,

    @Inject(LOGIN_FACTORY_SERVICE)
    private readonly loginFactoryService: ILoginFactory
  ) {}

  async login(rqLoginUserDto: RqLoginUserDto): Promise<RsLoginUserDto> {
    let authDto: RsLoginUserDto;

    try {
      const userEntity =
        this.loginFactoryService.DTORequesttoLoginEntity(rqLoginUserDto);

      const loginUserDB = await this.userRepository.findOneByOrFail({
        email: userEntity.email,
      });

      authDto =
        loginUserDB !== null
          ? (await this.encryptService.compare(
              userEntity.password,
              loginUserDB.password
            ))
            ? loginUserDB.estado === 1
              ? this.loginFactoryService.LoginEntitytoDTOResponse(
                  HttpStatus.OK,
                  "",
                  await this.jwtTokenService.signToken(loginUserDB)
                )
              : this.loginFactoryService.LoginEntitytoDTOResponse(
                  HttpStatus.FORBIDDEN,
                  "Usuario inactivo",
                  null
                )
            : this.loginFactoryService.LoginEntitytoDTOResponse(
                HttpStatus.FORBIDDEN,
                "Usuario y/o contraseña incorrecta",
                null
              )
          : this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.NOT_FOUND,
              "Usuario Inválido",
              null
            );
    } catch {
      authDto = this.loginFactoryService.LoginEntitytoDTOResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error en el servidor",
        null
      );
    }

    return authDto;
  }
}
