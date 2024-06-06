import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
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
  RqUpdateUserDto,
  RsUpdateUserDto,
} from "./dtos";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { AuthGuard } from "@guards/auth.guard";
import { RolesGuard } from "@guards/roles.guard";
import { Roles } from "src/decorators";
import { Rol } from "./common/enums";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { Observable, of } from "rxjs";

@ApiTags("Autenticacion")
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("auth/login")
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

  @Post("user/register")
  @Roles(Rol.ADMINISTRADOR)
  @UseGuards(AuthGuard, RolesGuard)
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
    return await this.userService.register(rqRegisterUserDto);
  }

  @Get("user/:id")
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
    return await this.userService.findOne(+id);
  }

  @Get("user")
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
    return await this.userService.findAll();
  }

  @Patch("user/:id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Modificación de usuario" })
  @ApiOkResponse({
    type: Promise<RsUpdateUserDto>,
  })
  @ApiNotFoundResponse({
    description: "El usuario no existe",
  })
  @ApiInternalServerErrorResponse({
    description: "Error al obtener usuario",
  })
  async update(
    @Param("id") id: string,
    @Body() rqUpdateUserDto: RqUpdateUserDto
  ): Promise<RsUpdateUserDto> {
    return await this.userService.update(+id, rqUpdateUserDto);
  }

  @Patch("user/upload/:id")
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File
  ): Promise<RsUpdateUserDto> {
    return await this.userService.update(+id, { image: file.filename });
  }

  @Get("user/upload/:id")
  @UseGuards(AuthGuard)
  findImage(@Param("id") id: string, @Res() res): Observable<Object> {
    return of(res.sendFile(join(process.cwd(), "uploads/" + id)));
  }
}
