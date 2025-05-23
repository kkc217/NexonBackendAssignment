import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateEventRequestDto } from './dto/request/create-event-request.dto';
import { GetEventsRequestDto } from './dto/request/get-events-request.dto';
import {
  EventDto,
  GetEventsResponseDto,
} from './dto/response/get-events-response.dto';
import { RewardCondition } from './enums/reward-condition.enum';
import { EventRepository } from './event.repository';
import { Event } from './schema/event.schema';

import { SortType } from '../common/enums/sort-type.enum';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(requestDto: CreateEventRequestDto): Promise<string | null> {
    const {
      title = '',
      startedAt,
      finishedAt,
      rewardId,
      rewardCondition = RewardCondition.LOGIN,
      isActive = true,
    } = requestDto;

    if (!rewardId) {
      throw new BadRequestException('rewardId is required.');
    }

    const now = new Date();
    const parsedStartedAt = new Date(startedAt ?? new Date());
    const parsedFinishedAt = new Date(finishedAt ?? new Date());

    if (parsedStartedAt < now || parsedStartedAt > parsedFinishedAt) {
      throw new BadRequestException('startedAt or finishedAt is not valid.');
    }

    const event = await this.eventRepository.create({
      title,
      startedAt: parsedStartedAt,
      finishedAt: parsedFinishedAt,
      rewardId,
      rewardCondition,
      isActive,
    });

    return event?._id?.toString() || null;
  }

  async getEvents(
    requestDto: GetEventsRequestDto,
  ): Promise<GetEventsResponseDto> {
    const {
      page = 1,
      pageSize = 20,
      sort = 'createdAt',
      sortType = SortType.DESC,
      rewardConditions = [],
      isActive = 'all',
      rewardId,
    } = requestDto;

    const events = await this.eventRepository.find({
      page,
      pageSize,
      sort,
      sortType,
      rewardConditions,
      isActive,
      rewardId,
    });

    return {
      events: plainToInstance(EventDto, events, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
