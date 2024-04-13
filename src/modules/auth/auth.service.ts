import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RsRegisterUserDto } from './dtos';
import { UserEntity } from './entities';
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  IRegisterFactory,
  REGISTER_FACTORY_SERVICE,
} from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory,

    @Inject(ENCRYPT_SERVICE)
    private readonly encryptService: IEncrypt,
  ) {}

  async register(userEntity: UserEntity): Promise<RsRegisterUserDto> {
    let registerUserDto: RsRegisterUserDto;

    try {
      userEntity.clave = await this.encryptService.encrypt(userEntity.clave);

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
}
