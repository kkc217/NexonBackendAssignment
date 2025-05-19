import { Module } from '@nestjs/common';

import { EventRewardUserController } from './event-reward-user.controller';
import { EventRewardController } from './event-reward.controller';
import { EventController } from './event.controller';

import { MicroserviceClientModule } from '../common/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [
    EventController,
    EventRewardController,
    EventRewardUserController,
  ],
})
export class EventModule {}
