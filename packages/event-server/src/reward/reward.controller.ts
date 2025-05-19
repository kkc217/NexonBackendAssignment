import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateRewardRequestDto } from './dto/request/create-reward-request.dto';
import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern({ cmd: 'event_reward_create' })
  async createReward(requestDto: CreateRewardRequestDto) {
    return this.rewardService.createReward(requestDto);
  }
}
