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
import { sendAndHandle } from '../common/utils/microservcie-request.util';
import { Roles } from '../common/decorators/role.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() body: any) {
    return sendAndHandle(this.authService, { cmd: 'auth_register' }, body);
  }

  @Post('login')
  async login(@Body() body: any) {
    return sendAndHandle(this.authService, { cmd: 'auth_login' }, body);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.ADMIN)
  @Patch('roles')
  async changeRoles() {}
}
