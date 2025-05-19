import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RewardCondition } from '../enums/reward-condition.enum';

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ default: '' })
  title: string;

  @Prop({ required: true, default: () => new Date() })
  startedAt: Date;

  @Prop({ required: true, default: () => new Date() })
  finishedAt: Date;

  @Prop({ required: true })
  rewardId: string;

  @Prop({ type: String, enum: RewardCondition, required: true })
  rewardCondition: RewardCondition;

  @Prop({ type: Boolean, required: true, default: true })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
