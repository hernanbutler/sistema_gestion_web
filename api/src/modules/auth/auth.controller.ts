import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
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
  RsGetUserDto,
  RsGetUsersDto,
} from "./dtos";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@guards/auth.guard";
import { RolesGuard } from "@guards/roles.guard";
import { Roles } from "src/decorators";
import { Rol } from "./common/enums";

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

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Búsqueda de usuario" })
  @ApiOkResponse({
    type: Promise<RsGetUserDto>,
  })
  @ApiNotFoundResponse({
    description: "El usuario no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener usuario",
  })
  async findOne(@Param("id") id: string): Promise<RsGetUserDto> {
    return await this.authService.findOne(+id);
  }

  @Get()
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: "Búsqueda de usuarios" })
  @ApiOkResponse({
    type: Promise<RsGetUsersDto>,
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener usuarios",
  })
  async findAll(): Promise<RsGetUsersDto> {
    return await this.authService.findAll();
  }
}
