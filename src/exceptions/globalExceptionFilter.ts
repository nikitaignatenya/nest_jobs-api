import { Response } from 'express';
import { buildResponse } from 'src/helpers/response';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import HttpException from 'src/exceptions/HttpException';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  status: number;
  message: string;
  id: number;
  constructor() {
    this.status = 500;
    this.message = 'Internal server error';
    this.id = 0;
  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      this.status = exception.status;
      this.message = exception.message;
      this.id = exception.id;
    }

    buildResponse(res, this.status, { id: this.id, message: this.message });
  }
}
