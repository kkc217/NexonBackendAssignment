import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { GrantRewardResponseDto } from './dto/response/grant-reward-response.dto';
import { RewardUserStatus } from './enums/reward-user-status.enum';
import { RewardUserRepository } from './reward-user.repository';
import { RewardUser } from './schema/reward-user.schema';

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
}
