import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { GetRewardRequestDto } from './dto/request/get-reward-request.dto';
import {
  GetRewardResponseDto,
  RewardDto,
} from './dto/response/get-reward-response.dto';
import { RewardRepository } from './reward.repository';

import { SortType } from '../common/enums/sort-type.enum';

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

  async getReward(
    requestDto: GetRewardRequestDto,
  ): Promise<GetRewardResponseDto> {
    const {
      page = 1,
      pageSize = 20,
      sort = 'createdAt',
      sortType = SortType.DESC,
      types = [],
    } = requestDto;

    const rewards = await this.rewardRepository.find({
      page,
      pageSize,
      sort,
      sortType,
      types,
    });

    return {
      rewards: plainToInstance(RewardDto, rewards, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async validateRewardExists(id: string): Promise<void> {
    const reward = await this.rewardRepository.findById(id);

    if (!reward) {
      throw new NotFoundException('Reward not found.');
    }
  }
}
