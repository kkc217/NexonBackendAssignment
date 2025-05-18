import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LoginRequestDto } from './dtos/request/login-request.dto';
import { RegisterRequestDto } from './dtos/request/register-request.dto';

import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @MessagePattern({ cmd: 'auth_register' })
  async register(requestDto: RegisterRequestDto): Promise<string | null> {
    return this.userService.createUser(requestDto);
  }

  @MessagePattern({ cmd: 'auth_login' })
  async login(requestDto: LoginRequestDto) {
    const user = await this.userService.checkAndGetUserByLoginId(
      requestDto.loginId,
    );

    return this.authService.login(user, requestDto.password);
  }

  @Get('jwks')
  async getJwks() {
    const jwk = await this.authService.getJwks();
    return { keys: [jwk] };
  }
}
