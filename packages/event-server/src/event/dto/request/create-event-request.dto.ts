import { RewardCondition } from '../../enums/reward-condition.enum';

export class CreateEventRequestDto {
  title?: string;
  startedAt?: string;
  finishedAt?: string;
  rewardId: string;
  rewardCondition?: RewardCondition;
  isActive?: boolean;
}
