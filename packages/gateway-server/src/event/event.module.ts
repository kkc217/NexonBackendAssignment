import { Module } from '@nestjs/common';

import { EventRewardController } from './event-reward.controller';
import { EventController } from './event.controller';

import { MicroserviceClientModule } from '../common/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [EventController, EventRewardController],
})
export class EventModule {}
