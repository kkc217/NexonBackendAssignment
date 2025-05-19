import { RewardCondition } from '../../../common/enums/reward-condition.enum';
import { SortType } from '../../../common/enums/sort-type.enum';

export class GetEventsRequestDto {
  page?: number;
  pageSize?: number;
  sort?: string;
  sortType?: SortType;
  rewardConditions?: RewardCondition[];
  isActive?: boolean | 'all';
  rewardId?: string;
}
