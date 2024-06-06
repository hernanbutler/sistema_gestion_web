import { HttpStatus, Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  RqRegisterUserDto,
  RqUpdateUserDto,
  RsGetUserDto,
  RsGetUsersDto,
  RsRegisterUserDto,
  RsUpdateUserDto,
} from "./dtos";
import { UserEntity } from "./entities";
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  IRegisterFactory,
  IUserFactory,
  REGISTER_FACTORY_SERVICE,
  USER_FACTORY_SERVICE,
} from "./interfaces";

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(ENCRYPT_SERVICE)
    private readonly encryptService: IEncrypt,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory,

    @Inject(USER_FACTORY_SERVICE)
    private readonly userFactoryService: IUserFactory
  ) {}

  onModuleInit() {
    this.userRepository
      .query(`INSERT INTO usuarios (email, password, estado, rol)
        SELECT 'admin@daw.com', '$2b$10$amt3Fs2Odn4OCDndgg8yZegoobDS.yQzpmeYNqIuVIPXi8vhxJqh2', 1, 'ADMINISTRADOR'
        FROM dual
        WHERE NOT EXISTS (
            SELECT 1
            FROM usuarios
            WHERE email = 'admin@daw.com'
        );`);
  }

  async register(
    rqRegisterUserDto: RqRegisterUserDto
  ): Promise<RsRegisterUserDto> {
    let userDto: RsRegisterUserDto;

    try {
      const userEntity =
        this.registerFactoryService.DTORequesttoRegisterEntity(
          rqRegisterUserDto
        );

      userEntity.password = await this.encryptService.encrypt(
        userEntity.password
      );

      const registerUserDB = await this.userRepository.save(userEntity);

      userDto =
        registerUserDB !== null
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CREATED,
              null
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              "Error al registrar el usuario"
            );
    } catch (err) {
      userDto =
        err.code && err.code === "ER_DUP_ENTRY"
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CONFLICT,
              "Inconsistencia al registrar el usuario"
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              "Error al registrar el usuario"
            );
    }

    return userDto;
  }

  async findOne(id: number): Promise<RsGetUserDto> {
    let userDto: RsGetUserDto;

    try {
      const userDB = await this.userRepository.findOneOrFail({
        where: { id },
      });

      userDto =
        userDB !== null
          ? this.userFactoryService.UserEntitytoDTOGetUserResponse(
              HttpStatus.OK,
              "",
              userDB
            )
          : this.userFactoryService.UserEntitytoDTOGetUserResponse(
              HttpStatus.NOT_FOUND,
              "El usuario no existe",
              null
            );
    } catch {
      userDto = this.userFactoryService.UserEntitytoDTOGetUserResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener usuario",
        null
      );
    }

    return userDto;
  }

  async findAll(): Promise<RsGetUsersDto> {
    let userDto: RsGetUsersDto;

    try {
      const usersDB = await this.userRepository.find();

      userDto = this.userFactoryService.UserEntitytoDTOGetUsersResponse(
        HttpStatus.OK,
        "",
        usersDB
      );
    } catch {
      userDto = this.userFactoryService.UserEntitytoDTOGetUsersResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al obtener usuarios",
        null
      );
    }

    return userDto;
  }

  async update(
    id: number,
    rqUpdateUserDto: RqUpdateUserDto
  ): Promise<RsUpdateUserDto> {
    let userDto: RsUpdateUserDto;

    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id },
      });

      const userDB = await this.userRepository.save({
        ...user,
        ...rqUpdateUserDto,
      });

      userDto =
        userDB !== null
          ? this.userFactoryService.UserEntitytoDTOUpdateUserResponse(
              HttpStatus.OK,
              ""
            )
          : this.userFactoryService.UserEntitytoDTOUpdateUserResponse(
              HttpStatus.NOT_FOUND,
              "Error al actualizar actividad"
            );
    } catch {
      userDto = this.userFactoryService.UserEntitytoDTOUpdateUserResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        "Error al actualizar actividad"
      );
    }

    return userDto;
  }
}
