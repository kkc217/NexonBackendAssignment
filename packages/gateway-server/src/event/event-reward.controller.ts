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
import { ADMIN, OPERATOR } from '../common/enums/role.enum';
import { sendAndHandle } from '../common/utils/microservcie-request.util';

@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(ADMIN, OPERATOR)
@Controller('events/rewards')
export class EventRewardController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventService: ClientProxy,
  ) {}

  @Post()
  async createEventReward(@Body() body: any) {
    return sendAndHandle(
      this.eventService,
      { cmd: 'event_reward_create' },
      body ?? {},
    );
  }

  @Get()
  async getEventRewards(@Query() query: any) {
    return sendAndHandle(
      this.eventService,
      { cmd: 'event_reward_get' },
      query ?? {},
    );
  }
}
