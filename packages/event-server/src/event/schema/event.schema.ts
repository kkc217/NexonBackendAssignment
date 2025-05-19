import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RewardCondition } from '../../common/enums/reward-condition.enum';

@Schema()
export class Event extends Document {
  // @Prop({ require})
  title: string;
  rewardCondition: RewardCondition;
  startedAt: Date;
  finishedAt: Date;
  isActive: boolean;
  rewardId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
