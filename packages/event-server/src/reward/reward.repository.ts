import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RewardType } from './enums/reward-type.enum';
import { Reward } from './schema/reward.schema';

import { SortType } from '../common/enums/sort-type.enum';

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

  async find(params: {
    page: number;
    pageSize: number;
    sort: string;
    sortType: SortType;
    types: RewardType[];
  }) {
    const { page, pageSize, sort, sortType, types } = params;

    const filter: any = {};
    if (types?.length) {
      filter.type = { $in: types };
    }

    const query = this.rewardModel.find(filter);

    query
      .sort({ [sort]: sortType })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return query.exec();
  }
}
