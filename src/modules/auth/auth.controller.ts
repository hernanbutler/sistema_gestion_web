import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RqRegisterUserDto, RsLoginDto, RsRegisterUserDto } from './dtos';
import { REGISTER_FACTORY_SERVICE, IRegisterFactory } from './interfaces';
import { RqLoginDto } from './dtos/rq-login-user.dto';
import { ILoginFactory, LOGIN_FACTORY_SERVICE } from './interfaces/login-factory.interface';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory,

    @Inject(LOGIN_FACTORY_SERVICE)
    private readonly loginFactoryService: ILoginFactory,

  ) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RqRegisterUserDto,
  ): Promise<RsRegisterUserDto> {
    const registerData =
      this.registerFactoryService.DTORequesttoRegisterEntity(registerUserDto);
    return await this.authService.register(registerData);
  }

  

  @Post('login')
  async login(
    @Body() loginDto: RqLoginDto,
  ): Promise<RsLoginDto> {
    const login =
      this.loginFactoryService.DTORequesttoLoginEntity(loginDto);
    return await this.authService.login(login);
  }



}
