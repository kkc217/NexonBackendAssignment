import { Expose } from 'class-transformer';

import { RewardUserStatus } from '../../enums/reward-user-status.enum';

export class GetRewardUsersResponseDto {
  rewardUsers: RewardUserDto[];
}

export class RewardUserDto {
  @Expose()
  userId: string;

  @Expose()
  eventId: string;

  @Expose()
  rewardId: string;

  @Expose()
  status: RewardUserStatus;
}
