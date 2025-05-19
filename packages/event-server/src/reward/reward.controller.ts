import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { GetRewardRequestDto } from './dto/request/get-reward-request.dto';
import { GetRewardResponseDto } from './dto/response/get-reward-response.dto';
import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern({ cmd: 'event_reward_create' })
  async createReward(
    requestDto: CreateRewardRequestDto,
  ): Promise<string | null> {
    return this.rewardService.createReward(requestDto);
  }

  @MessagePattern({ cmd: 'event_reward_get' })
  async getRewards(
    requestDto: GetRewardRequestDto,
  ): Promise<GetRewardResponseDto> {
    return this.rewardService.getReward(requestDto);
  }
}
