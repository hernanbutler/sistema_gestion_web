import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from "@nestjs/common";

import {
  RqRegisterUserDto,
  RsRegisterUserDto,
  RqLoginUserDto,
  RsLoginUserDto,
} from "./dtos";
import {
  REGISTER_FACTORY_SERVICE,
  IRegisterFactory,
  LOGIN_FACTORY_SERVICE,
  ILoginFactory,
} from "./interfaces";
import { AuthService } from "./auth.service";

@Controller({ path: "auth" })
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(LOGIN_FACTORY_SERVICE)
    private readonly loginFactoryService: ILoginFactory,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory
  ) {}

  @Post("register")
  async register(
    @Body() registerUserDto: RqRegisterUserDto
  ): Promise<RsRegisterUserDto> {
    const registerData =
      this.registerFactoryService.DTORequesttoRegisterEntity(registerUserDto);
    return await this.authService.register(registerData);
  }

  @Post("login")
  async login(@Body() loginUserDto: RqLoginUserDto): Promise<RsLoginUserDto> {
    const loginData =
      this.loginFactoryService.DTORequesttoLoginEntity(loginUserDto);
    return await this.authService.login(loginData);
  }
}
