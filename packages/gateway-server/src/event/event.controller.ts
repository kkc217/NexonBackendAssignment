import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { sendAndHandle } from '../common/utils/microservcie-request.util';

@Controller('events')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventService: ClientProxy,
  ) {}

  @Post()
  async createEvent(@Body() body: any) {
    return sendAndHandle(this.eventService, { cmd: 'event_create' }, body);
  }

  @Get()
  async getEvents(@Query() query: any) {
    return sendAndHandle(this.eventService, { cmd: 'event_get' }, query);
  }
}
