import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";

import {
  RqRegisterUserDto,
  RsRegisterUserDto,
  RqLoginUserDto,
  RsLoginUserDto,
} from "./dtos";
import { AuthService } from "./auth.service";

@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(
    @Body() rqRegisterUserDto: RqRegisterUserDto
  ): Promise<RsRegisterUserDto> {
    return await this.authService.register(rqRegisterUserDto);
  }

  @Post("login")
  async login(@Body() rqLoginUserDto: RqLoginUserDto): Promise<RsLoginUserDto> {
    return await this.authService.login(rqLoginUserDto);
  }
}
