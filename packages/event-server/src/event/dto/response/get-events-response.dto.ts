import { Expose } from 'class-transformer';

import { RewardCondition } from '../../enums/reward-condition.enum';

export class GetEventsResponseDto {
  events: EventDto[];
}

export class EventDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  startedAt: Date;

  @Expose()
  finishedAt: Date;

  @Expose()
  rewardId: string;

  @Expose()
  rewardCondition: RewardCondition;

  @Expose()
  isActive: boolean;
}
