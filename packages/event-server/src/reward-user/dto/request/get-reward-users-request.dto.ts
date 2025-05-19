import { SortType } from '../../../common/enums/sort-type.enum';

export class GetRewardUsersRequestDto {
  page?: number;
  pageSize?: number;
  sort?: string;
  sortType?: SortType;
  userId?: string;
  eventId?: string;
  rewardId?: string;
}
