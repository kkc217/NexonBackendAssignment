import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Event } from './schema/event.schema';

import { RewardCondition } from '../common/enums/reward-condition.enum';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async create(params: {
    title?: string;
    startedAt?: Date;
    finishedAt?: Date;
    rewardId: string;
    rewardCondition?: RewardCondition;
    isActive?: boolean;
  }) {
    return this.eventModel.create(params);
  }
}
