import { HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export async function sendAndHandle<T = any>(
  client: ClientProxy,
  pattern: Record<string, any>,
  payload: any,
  defaultErrorStatus: number = HttpStatus.INTERNAL_SERVER_ERROR,
): Promise<T> {
  try {
    const response = await firstValueFrom(client.send(pattern, payload));

    if (response?.success === false) {
      const status = response.error?.code || defaultErrorStatus;
      throw new HttpException(response.error, status);
    }

    return response;
  } catch (error) {
    const status =
      error instanceof HttpException ? error.getStatus() : defaultErrorStatus;
    const message = error?.message || 'Unexpected microservice error.';

    throw new HttpException({ success: false, error: { message } }, status);
  }
}
