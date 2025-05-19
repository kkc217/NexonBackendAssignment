import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { RewardType } from '../enums/reward-type.enum';

@Schema({ timestamps: true })
export class Reward extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String, enum: RewardType, required: true })
  type: RewardType;

  @Prop({ required: true, default: 0 })
  quantity: number;

  @Prop({ type: Object })
  meta: Record<string, any>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
