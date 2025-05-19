import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RewardController } from './reward.controller';
import { RewardRepository } from './reward.repository';
import { RewardService } from './reward.service';
import { Reward, RewardSchema } from './schema/reward.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reward.name, schema: RewardSchema }]),
  ],
  controllers: [RewardController],
  providers: [RewardRepository, RewardService],
  exports: [RewardService],
})
export class RewardModule {}
