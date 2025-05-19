import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { RewardRepository } from './reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async createReward(
    requestDto: CreateRewardRequestDto,
  ): Promise<string | null> {
    const { title, type, quantity = 0, meta } = requestDto;

    if (!title || !type || !meta) {
      throw new BadRequestException('title, type, meta are required.');
    }

    let parsedMeta: Record<string, any>;
    try {
      parsedMeta = JSON.parse(meta);
    } catch {
      throw new BadRequestException('meta is not available.');
    }

    const reward = await this.rewardRepository.create({
      title,
      type,
      quantity,
      meta: parsedMeta,
    });

    return reward?._id?.toString() || null;
  }
}
