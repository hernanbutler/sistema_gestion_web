import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import {
  RqRegisterUserDto,
  RsRegisterUserDto,
  RqLoginUserDto,
  RsLoginUserDto,
} from "./dtos";
import { AuthService } from "./auth.service";

@ApiTags("Autenticacion")
@Controller("auth")
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login de usuario" })
  @ApiOkResponse({
    type: Promise<RsLoginUserDto>,
  })
  @ApiForbiddenResponse({
    description: "Usuario y/o contraseña incorrecta",
  })
  @ApiNotFoundResponse({
    description: "Usuario Invàlido",
  })
  @ApiInternalServerErrorResponse({
    description: "Error en el servidor",
  })
  async login(@Body() rqLoginUserDto: RqLoginUserDto): Promise<RsLoginUserDto> {
    return await this.authService.login(rqLoginUserDto);
  }

  @Post("register")
  @ApiOperation({ summary: "Registro de usuario" })
  @ApiCreatedResponse({
    type: Promise<RsRegisterUserDto>,
  })
  @ApiInternalServerErrorResponse({
    description: "Error al registrar el usuario",
  })
  @ApiConflictResponse({
    description: "Inconsistencia al registrar el usuario",
  })
  async register(
    @Body() rqRegisterUserDto: RqRegisterUserDto
  ): Promise<RsRegisterUserDto> {
    return await this.authService.register(rqRegisterUserDto);
  }
}
