import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { JwtAuthGuard } from '../common/auth/auth.guard';
import { RoleGuard } from '../common/auth/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { CurrentUser } from '../common/decorators/user.decorator';
import { ADMIN, AUDITOR, USER } from '../common/enums/role.enum';
import { sendAndHandle } from '../common/utils/microservcie-request.util';

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('events/rewards/users')
export class EventRewardUserController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventService: ClientProxy,
  ) {}

  @Roles(ADMIN, USER)
  @Post()
  async grantReward(@CurrentUser() user: any, @Body() body: any) {
    const payload = {
      ...body,
      userId: user.id,
    };

    return sendAndHandle(
      this.eventService,
      { cmd: 'event_reward_user_grant' },
      payload,
    );
  }

  @Roles(ADMIN, AUDITOR)
  @Get()
  async getRewardUsers(@Query() query: any) {
    return sendAndHandle(
      this.eventService,
      { cmd: 'event_reward_user_get' },
      query ?? {},
    );
  }
}
