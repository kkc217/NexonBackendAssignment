import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';
import { Event, EventSchema } from './schema/event.schema';

import { RewardModule } from '../reward/reward.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    RewardModule,
  ],
  controllers: [EventController],
  providers: [EventRepository, EventService],
  exports: [EventService],
})
export class EventModule {}
