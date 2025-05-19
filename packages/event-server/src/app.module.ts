import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { validationSchema } from './common/config/validation-schema';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_HOST'),
      }),
      inject: [ConfigService],
    }),
    EventModule,
    RewardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
