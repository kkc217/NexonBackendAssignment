import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { sendAndHandle } from '../common/utils/microservcie-request.util';

@Controller('event')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventService: ClientProxy,
  ) {}

  @Get()
  async test() {
    return sendAndHandle(this.eventService, { cmd: 'event_test' }, {});
  }
}
