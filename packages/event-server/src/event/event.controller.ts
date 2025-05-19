import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('event')
export class EventController {
  @MessagePattern({ cmd: 'event_create' })
  async createEvent() {}
}
