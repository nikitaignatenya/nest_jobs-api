import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import HttpException from 'src/exceptions/HttpException';
import { ExceptionTypes } from 'src/exceptions/exceptions.types';

@Injectable()
export class BodyMiddleware implements NestMiddleware {
  use(req: Request, next: NextFunction) {
    if (!req.body.title)
      throw new HttpException(400, ExceptionTypes.BODY_TITLE_IS_REQUIRED);
    next();
  }
}
