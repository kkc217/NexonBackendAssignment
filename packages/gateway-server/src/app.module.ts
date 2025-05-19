import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_HOST'),
      }),
      inject: [ConfigService],
    }),
    MicroserviceClientModule,
    JwtModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
