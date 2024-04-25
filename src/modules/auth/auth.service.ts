import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  RqLoginUserDto,
  RqRegisterUserDto,
  RsLoginUserDto,
  RsRegisterUserDto,
} from "./dtos";
import { UserEntity } from "./entities";
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  IJwtToken,
  ILoginFactory,
  IRegisterFactory,
  JWT_TOKEN_SERVICE,
  LOGIN_FACTORY_SERVICE,
  REGISTER_FACTORY_SERVICE,
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
    private readonly loginFactoryService: ILoginFactory,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory
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
            ? this.loginFactoryService.LoginEntitytoDTOResponse(
                HttpStatus.OK,
                "",
                await this.jwtTokenService.signToken(loginUserDB)
              )
            : this.loginFactoryService.LoginEntitytoDTOResponse(
                HttpStatus.FORBIDDEN,
                "Usuario / Contraseña incorrecto",
                null
              )
          : this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.NOT_FOUND,
              "Usuario Invàlido",
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

  async register(
    rqRegisterUserDto: RqRegisterUserDto
  ): Promise<RsRegisterUserDto> {
    let authDto: RsRegisterUserDto;

    try {
      const userEntity =
        this.registerFactoryService.DTORequesttoRegisterEntity(
          rqRegisterUserDto
        );

      userEntity.password = await this.encryptService.encrypt(
        userEntity.password
      );

      const registerUserDB = await this.userRepository.save(userEntity);

      authDto =
        registerUserDB !== null
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CREATED,
              "Usuario creado exitosamente"
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              "Error al registrar el usuario"
            );
    } catch (err) {
      authDto =
        err.code && err.code === "ER_DUP_ENTRY"
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CONFLICT,
              "Inconsistencia detectada al registrar el usuario"
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              "Error al registrar el usuario"
            );
    }

    return authDto;
  }
}
