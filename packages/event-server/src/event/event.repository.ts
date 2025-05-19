import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RewardCondition } from './enums/reward-condition.enum';
import { Event } from './schema/event.schema';

import { SortType } from '../common/enums/sort-type.enum';

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
  }): Promise<Event> {
    return this.eventModel.create(params);
  }

  async find(params: {
    page: number;
    pageSize: number;
    sort: string;
    sortType: SortType;
    rewardConditions?: RewardCondition[];
    isActive: boolean | 'all';
    rewardId?: string;
  }): Promise<Event[]> {
    const {
      page,
      pageSize,
      sort,
      sortType,
      rewardConditions,
      isActive,
      rewardId,
    } = params;

    const filter: any = {};
    if (rewardConditions?.length) {
      filter.rewardCondition = { $in: rewardConditions };
    }

    if (isActive !== 'all') {
      filter.isActive = isActive;
    }

    if (rewardId) {
      filter.rewardId = rewardId;
    }

    const query = this.eventModel.find(filter);

    query
      .sort({ [sort]: sortType })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return query.exec();
  }
}
