import { RewardType } from '../../enums/reward-type.enum';

export class CreateRewardRequestDto {
  title: string;
  type: RewardType;
  quantity?: number;
  meta: string;
}
