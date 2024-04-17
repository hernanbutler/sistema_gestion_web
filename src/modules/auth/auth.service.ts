import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RsLoginDto, RsRegisterUserDto } from './dtos';
import { UserEntity } from './entities';
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  IRegisterFactory,
  REGISTER_FACTORY_SERVICE,
} from './interfaces';
import { ILoginFactory, LOGIN_FACTORY_SERVICE} from './interfaces/login-factory.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory,

    @Inject(ENCRYPT_SERVICE)
    private readonly encryptService: IEncrypt,

    @Inject(LOGIN_FACTORY_SERVICE)
    private readonly loginFactoryService: ILoginFactory,

    private readonly jwtService: JwtService

  ) {}

  async register(userEntity: UserEntity): Promise<RsRegisterUserDto> {
    let registerUserDto: RsRegisterUserDto;

    try {
      userEntity.password = await this.encryptService.encrypt(userEntity.password);

      const registerUserDB = await this.userRepository.save(userEntity);

      registerUserDto =
        registerUserDB !== null
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CREATED,
              'Usuario creado exitosamente',
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Error al registrar el usuario',
            );
    } catch (err) {
      registerUserDto =
        err.code && err.code === 'ER_DUP_ENTRY'
          ? this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.CONFLICT,
              'Inconsistencia detectada al registrar el usuario',
            )
          : this.registerFactoryService.RegisterEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Error al registrar el usuario',
            );
    }

    return registerUserDto;
  }

  async login(userEntity: UserEntity): Promise<RsLoginDto> {
    let loginDto: RsLoginDto;

    try {
      userEntity.clave = await this.encryptService.encrypt(userEntity.clave);

      let loginDB = await this.userRepository.findOneBy(userEntity);

      loginDto =
        loginDB !== null
          ? this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.CREATED,
              'Clave creado exitosamente',
            )
          : this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Error al ingresar la clave',
            );
    } catch (err) {
      loginDto =
        err.code && err.code === 'ER_DUP_ENTRY'
          ? this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.CONFLICT,
              'Inconsistencia detectada al ingresar la clave',
            )
          : this.loginFactoryService.LoginEntitytoDTOResponse(
              HttpStatus.INTERNAL_SERVER_ERROR,
              'Error al registrar la clave',
            );
    }

    return loginDto;
    
  } 
}