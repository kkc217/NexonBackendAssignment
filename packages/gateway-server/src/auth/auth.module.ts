import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { MicroserviceClientModule } from '../common/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [AuthController],
})
export class AuthModule {}
