import { SortType } from '../../../common/enums/sort-type.enum';
import { RewardType } from '../../enums/reward-type.enum';

export class GetRewardRequestDto {
  page?: number;
  pageSize?: number;
  sort?: string;
  sortType?: SortType;
  types?: RewardType[];
}
