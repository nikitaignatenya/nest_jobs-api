import { Module, RequestMethod } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BodyMiddleware } from './middlewares/body.middleware';
import { DatabaseService } from './storage/database.service';

@Module({
  imports: [JobsModule],
  controllers: [JobsController],
  providers: [JobsService, DatabaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, BodyMiddleware)
      .forRoutes({ path: 'jobs', method: RequestMethod.POST });
  }
}
