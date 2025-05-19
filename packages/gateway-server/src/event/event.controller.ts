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
@Controller('events')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventService: ClientProxy,
  ) {}

  @Post()
  async createEvent(@Body() body: any) {
    return sendAndHandle(
      this.eventService,
      { cmd: 'event_create' },
      body ?? {},
    );
  }

  @Get()
  async getEvents(@Query() query: any) {
    return sendAndHandle(this.eventService, { cmd: 'event_get' }, query ?? {});
  }
}
