import { Expose } from 'class-transformer';

import { RewardUserStatus } from '../../enums/reward-user-status.enum';

export class GrantRewardResponseDto {
  @Expose()
  id: string;

  @Expose()
  eventId: string;

  @Expose()
  rewardId: string;

  @Expose()
  status: RewardUserStatus;
}
