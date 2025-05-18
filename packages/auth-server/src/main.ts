import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import * as process from 'node:process';

import { AppModule } from './app.module';
import { ErrorResponseFilter } from './common/filters/error-response.filter';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';

async function bootstrap() {
  const httpPort = parseInt(process.env.HTTP_PORT || '4001');
  const app = await NestFactory.create(AppModule);

  await app.listen(httpPort);
  console.log(`🚀 Auth server listen at http://localhost:${httpPort}`);

  const port = parseInt(process.env.PORT || '3001');
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port,
        host: '0.0.0.0',
      },
    });

  microservice.useGlobalFilters(new ErrorResponseFilter());
  microservice.useGlobalInterceptors(new SuccessResponseInterceptor());

  await microservice.listen();
  console.log(`🚀 Auth server running on TCP port ${port}`);
}

bootstrap();
