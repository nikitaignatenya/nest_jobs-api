import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import iJobs from 'src/interfaces/interfaces';
import { JobsService } from './jobs.service';

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/')
  getData(): iJobs[] {
    return this.jobsService.getData();
  }
  @Get('/:id')
  getDataById(@Param('id') id: string): iJobs[] {
    return this.jobsService.getDataById(id);
  }
  @Post('/')
  createData(@Body() body: any): iJobs[] {
    return this.jobsService.createData(body);
  }
  @Patch('/:id')
  updateData(@Param('id') id: string, @Body() body: iJobs[]): iJobs[] {
    return this.jobsService.updateData(id, body);
  }
  @Delete(':id')
  deleteData(@Param('id') id: string): iJobs[] {
    return this.jobsService.deleteData(id);
  }
}
