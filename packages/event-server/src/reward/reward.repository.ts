import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RewardType } from './enums/reward-type.enum';
import { Reward } from './schema/reward.schema';

@Injectable()
export class RewardRepository {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<Reward>,
  ) {}

  async create(params: {
    title: string;
    type: RewardType;
    quantity: number;
    meta: Record<string, any>;
  }): Promise<Reward> {
    return this.rewardModel.create(params);
  }
}
