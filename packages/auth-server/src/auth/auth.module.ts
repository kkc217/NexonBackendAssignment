import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import * as fs from 'fs';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import {
  JWT_ALGORITHM,
  JWT_EXPIRES_IN,
  JWT_PRIVATE_KEY_PATH,
} from '../common/constants';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      privateKey: fs.readFileSync(JWT_PRIVATE_KEY_PATH, 'utf-8'),
      signOptions: { algorithm: JWT_ALGORITHM, expiresIn: JWT_EXPIRES_IN },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
