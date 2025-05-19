import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateEventRequestDto } from './dto/request/create-event-request.dto';
import { GetEventsRequestDto } from './dto/request/get-events-request.dto';
import { GetEventsResponseDto } from './dto/response/get-events-response.dto';
import { EventService } from './event.service';

import { RewardService } from '../reward/reward.service';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly rewardService: RewardService,
  ) {}

  @MessagePattern({ cmd: 'event_create' })
  async createEvent(requestDto: CreateEventRequestDto): Promise<string | null> {
    await this.rewardService.validateRewardExists(requestDto.rewardId);

    return this.eventService.createEvent(requestDto);
  }

  @MessagePattern({ cmd: 'event_get' })
  async getEvents(
    requestDto: GetEventsRequestDto,
  ): Promise<GetEventsResponseDto> {
    return this.eventService.getEvents(requestDto);
  }
}
