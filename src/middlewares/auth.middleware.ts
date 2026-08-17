import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction, Response } from 'express';
import HttpException from 'src/exceptions/HttpException';
import { ExceptionTypes } from 'src/exceptions/exceptions.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.body || !req.header('Authorization'))
      throw new HttpException(400, ExceptionTypes.HEADER_AUTH_IS_REQUIRED);
    next();
  }
}
