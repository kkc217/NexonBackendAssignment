import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { GetRewardUsersRequestDto } from './dto/request/get-reward-users-request.dto';
import { GrantRewardRequestDto } from './dto/request/grant-reward-request.dto';
import { GetRewardUsersResponseDto } from './dto/response/get-reward-users-response.dto';
import { GrantRewardResponseDto } from './dto/response/grant-reward-response.dto';
import { RewardUserService } from './reward-user.service';

import { EventService } from '../event/event.service';

@Controller('rewards/users')
export class RewardUserController {
  constructor(
    private readonly rewardUserService: RewardUserService,
    private readonly eventService: EventService,
  ) {}

  @MessagePattern({ cmd: 'event_reward_user_grant' })
  async grantRewardToUser(
    requestDto: GrantRewardRequestDto,
  ): Promise<GrantRewardResponseDto> {
    const event = await this.eventService.getEventById(requestDto.eventId);

    return this.rewardUserService.grantRewardToUser(requestDto.userId, event);
  }

  @MessagePattern({ cmd: 'event_reward_user_get' })
  async getRewardUsers(
    requestDto: GetRewardUsersRequestDto,
  ): Promise<GetRewardUsersResponseDto> {
    return this.rewardUserService.getRewardUsers(requestDto);
  }
}
