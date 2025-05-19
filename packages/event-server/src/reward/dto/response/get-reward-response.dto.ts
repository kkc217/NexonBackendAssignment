import { Expose } from 'class-transformer';

import { RewardType } from '../../enums/reward-type.enum';

export class GetRewardResponseDto {
  rewards: RewardDto[];
}

export class RewardDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  type: RewardType;

  @Expose()
  quantity: number;

  @Expose()
  meta: Record<string, any>;
}
