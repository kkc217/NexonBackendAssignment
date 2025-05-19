import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RewardUserStatus } from './enums/reward-user-status.enum';
import { RewardUser } from './schema/reward-user.schema';

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
}
