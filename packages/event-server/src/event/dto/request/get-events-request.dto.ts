import { SortType } from '../../../common/enums/sort-type.enum';
import { RewardCondition } from '../../enums/reward-condition.enum';

export class GetEventsRequestDto {
  page?: number;
  pageSize?: number;
  sort?: string;
  sortType?: SortType;
  rewardConditions?: RewardCondition[];
  isActive?: boolean | 'all';
  rewardId?: string;
}
