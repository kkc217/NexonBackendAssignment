import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './schema/user.schema';
import { UserRepository } from './user.repository';

import { RegisterRequestDto } from '../auth/dtos/request/register-request.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(requestDto: RegisterRequestDto): Promise<string | null> {
    const { loginId, password, roles = [Role.USER] } = requestDto;

    const existingUser = await this.userRepository.findByLoginId(loginId);
    if (existingUser) throw new UnauthorizedException('User already exists.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create(
      loginId,
      hashedPassword,
      roles,
    );

    return user?._id?.toString() || null;
  }

  async checkAndGetUserByLoginId(loginId: string): Promise<User> {
    const user = await this.userRepository.findByLoginId(loginId);

    if (!user) throw new NotFoundException('User does not exist.');

    return user;
  }
}
