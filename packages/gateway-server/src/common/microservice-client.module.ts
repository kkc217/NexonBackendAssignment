import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: 'auth-server', port: 3001 },
      },
      {
        name: 'EVENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'event-server', port: 3002 },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroserviceClientModule {}
