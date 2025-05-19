import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateEventRequestDto } from './dto/request/create-event-request.dto';
import { GetEventsRequestDto } from './dto/request/get-events-request.dto';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: 'event_create' })
  async createEvent(requestDto: CreateEventRequestDto): Promise<string | null> {
    return this.eventService.createEvent(requestDto);
  }

  @MessagePattern({ cmd: 'event_get' })
  async getEvents(requestDto: GetEventsRequestDto) {
    return this.eventService.getEvents(requestDto);
  }
}
