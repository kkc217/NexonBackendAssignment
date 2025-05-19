import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RewardUserStatus } from './enums/reward-user-status.enum';
import { RewardUser } from './schema/reward-user.schema';

import { SortType } from '../common/enums/sort-type.enum';

@Injectable()
export class RewardUserRepository {
  constructor(
    @InjectModel(RewardUser.name)
    private readonly rewardUserModel: Model<RewardUser>,
  ) {}

  async create(params: {
    userId: string;
    eventId: string;
    rewardId: string;
    status: RewardUserStatus;
  }): Promise<RewardUser> {
    return this.rewardUserModel.create(params);
  }

  async updateStatus(
    id: string,
    status: RewardUserStatus,
  ): Promise<RewardUser | null> {
    return this.rewardUserModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async find(params: {
    page: number;
    pageSize: number;
    sort: string;
    sortType: SortType;
    userId?: string;
    eventId?: string;
    rewardId?: string;
  }): Promise<RewardUser[]> {
    const { page, pageSize, sort, sortType, userId, eventId, rewardId } =
      params;

    const filter: any = {};
    if (userId) {
      filter.userId = { $in: userId };
    }

    if (eventId) {
      filter.eventId = { $in: eventId };
    }

    if (rewardId) {
      filter.rewardId = { $in: rewardId };
    }

    const query = this.rewardUserModel.find(filter);

    query
      .sort({ [sort]: sortType })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return query.exec();
  }
}
