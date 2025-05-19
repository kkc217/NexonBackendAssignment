import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RewardUserStatus } from '../enums/reward-user-status.enum';

@Schema({ timestamps: true })
export class RewardUser extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  rewardId: string;

  @Prop({ type: String, enum: RewardUserStatus, required: true })
  status: RewardUserStatus;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RewardUserSchema = SchemaFactory.createForClass(RewardUser);
RewardUserSchema.index(
  { userId: 1, eventId: 1, rewardId: 1 },
  { unique: true },
);
