import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './auth/jwt.module';
import { validationSchema } from './common/config/validation-schema';
import { MicroserviceClientModule } from './common/microservice-client.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    MicroserviceClientModule,
    JwtModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
