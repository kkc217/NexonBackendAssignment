import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './common/config/validation-schema';
import { MicroserviceClientModule } from './common/microservice-client.module';

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
    MicroserviceClientModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
