import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';

import { MicroserviceClientModule } from '../common/microservice-client.module';

@Module({
  imports: [MicroserviceClientModule],
  controllers: [AuthController],
  providers: [JwtService],
})
export class AuthModule {}
