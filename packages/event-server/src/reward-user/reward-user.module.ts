import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RewardUserController } from './reward-user.controller';
import { RewardUserRepository } from './reward-user.repository';
import { RewardUserService } from './reward-user.service';
import { RewardUser, RewardUserSchema } from './schema/reward-user.schema';

import { EventModule } from '../event/event.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RewardUser.name, schema: RewardUserSchema },
    ]),
    EventModule,
  ],
  controllers: [RewardUserController],
  providers: [RewardUserRepository, RewardUserService],
})
export class RewardUserModule {}
