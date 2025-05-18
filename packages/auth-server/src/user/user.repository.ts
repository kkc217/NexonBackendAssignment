import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schema/user.schema';

import { Role } from '../common/enums/role.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(
    loginId: string,
    password: string,
    roles?: Role[],
  ): Promise<User> {
    return this.userModel.create({ loginId, password, roles });
  }

  async findByLoginId(loginId: string): Promise<User | null> {
    return await this.userModel.findOne({ loginId }).exec();
  }
}
