import {
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { JwtAuthGuard } from '../common/auth/auth.guard';
import { RoleGuard } from '../common/auth/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { ADMIN } from '../common/enums/role.enum';
import { sendAndHandle } from '../common/utils/microservcie-request.util';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    return sendAndHandle(
      this.authService,
      { cmd: 'auth_register' },
      body ?? {},
    );
  }

  @Post('login')
  async login(@Body() body: any) {
    return sendAndHandle(this.authService, { cmd: 'auth_login' }, body ?? {});
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(ADMIN)
  @Patch('roles')
  async changeRoles() {}
}
