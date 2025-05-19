import { Controller } from '@nestjs/common';

import { RewardService } from './reward.service';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}
}
