import { Module, RequestMethod } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { BodyMiddleware } from './middlewares/body.middleware';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [JobsModule],
  controllers: [JobsController],
  providers: [JobsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BodyMiddleware)
      .forRoutes({ path: 'jobs', method: RequestMethod.POST });
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'jobs', method: RequestMethod.POST });
  }
}
