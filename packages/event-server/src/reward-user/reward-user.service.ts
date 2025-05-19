import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { GetRewardUsersRequestDto } from './dto/request/get-reward-users-request.dto';
import {
  GetRewardUsersResponseDto,
  RewardUserDto,
} from './dto/response/get-reward-users-response.dto';
import { GrantRewardResponseDto } from './dto/response/grant-reward-response.dto';
import { RewardUserStatus } from './enums/reward-user-status.enum';
import { RewardUserRepository } from './reward-user.repository';
import { RewardUser } from './schema/reward-user.schema';

import { SortType } from '../common/enums/sort-type.enum';
import { Event } from '../event/schema/event.schema';

@Injectable()
export class RewardUserService {
  constructor(private readonly rewardUserRepository: RewardUserRepository) {}

  async grantRewardToUser(
    userId: string,
    event: Event | null,
  ): Promise<GrantRewardResponseDto> {
    if (!userId || !event) {
      throw new BadRequestException('userId, eventId are invalid.');
    }

    let rewardUser: RewardUser;
    try {
      rewardUser = await this.rewardUserRepository.create({
        userId,
        eventId: event.id,
        rewardId: event.rewardId,
        status: RewardUserStatus.PENDING,
      });
    } catch {
      throw new ConflictException('duplicated reward request.');
    }

    let result: RewardUser | null;
    try {
      // 보상 지급

      result = await this.rewardUserRepository.updateStatus(
        rewardUser.id,
        RewardUserStatus.SUCCESS,
      );
    } catch {
      result = await this.rewardUserRepository.updateStatus(
        rewardUser.id,
        RewardUserStatus.FAILED,
      );
    }

    return plainToInstance(GrantRewardResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async getRewardUsers(
    requestDto: GetRewardUsersRequestDto,
  ): Promise<GetRewardUsersResponseDto> {
    const {
      page = 1,
      pageSize = 20,
      sort = 'createdAt',
      sortType = SortType.DESC,
      userId,
      eventId,
      rewardId,
    } = requestDto;

    const rewardUsers = await this.rewardUserRepository.find({
      page,
      pageSize,
      sort,
      sortType,
      userId,
      eventId,
      rewardId,
    });

    return {
      rewardUsers: plainToInstance(RewardUserDto, rewardUsers, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
