import { AuthService } from './auth.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Inject,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RqRegisterUserDto, RsRegisterUserDto } from './dtos';
import { REGISTER_FACTORY_SERVICE, IRegisterFactory } from './interfaces';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterFactory,
  ) {}

  @Post('register')
  async register(
    @Body() registerUserDto: RqRegisterUserDto,
  ): Promise<RsRegisterUserDto> {
    const registerData =
      this.registerFactoryService.DTORequesttoRegisterEntity(registerUserDto);
    return await this.authService.register(registerData);
  }
}
