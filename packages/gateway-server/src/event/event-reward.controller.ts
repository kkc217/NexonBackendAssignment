import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { sendAndHandle } from '../common/utils/microservcie-request.util';

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
}
