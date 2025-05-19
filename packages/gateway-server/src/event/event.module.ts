import { Module } from '@nestjs/common';

import { EventController } from './event.controller';

import { MicroserviceClientModule } from '../common/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [EventController],
})
export class EventModule {}
