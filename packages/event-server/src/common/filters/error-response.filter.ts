import {
  ArgumentsHost,
  Catch,
  HttpException,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

import { errorWrapper } from '../wrappers/response.wrapper';

@Catch()
export class ErrorResponseFilter implements RpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const message =
      exception instanceof RpcException || exception instanceof HttpException
        ? exception.message
        : 'Internal server error.';

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;

    return throwError(() => errorWrapper(message, statusCode));
  }
}
