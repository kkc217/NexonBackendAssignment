import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { ErrorResponseFilter } from './common/filters/error-response.filter';
import { SuccessResponseInterceptor } from './common/interceptors/success-response.interceptor';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3002');
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
  console.log(`🚀 Event server running on TCP port ${port}`);
}

bootstrap();
