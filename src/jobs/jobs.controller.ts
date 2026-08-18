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
import HttpException from 'src/exceptions/HttpException';
import iJobs from 'src/interfaces/interfaces';
import { JobsService } from './jobs.service';

@Controller('/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get('/')
  getData(): Promise<iJobs[]> {
    try {
      return this.jobsService.getData();
    } catch (error) {
      throw new HttpException(400, { id: 1, message: `${error}` });
    }
  }
  @Get('/:id')
  getDataById(@Param('id') id: string): Promise<iJobs[]> {
    try {
      if (isNaN(+id)) throw new Error('Parametr typeof = String');
      return this.jobsService.getDataById(id);
    } catch (error) {
      throw new HttpException(400, { id: 1, message: `${error}` });
    }
  }
  @Post('/')
  createData(@Body() body: any): Promise<iJobs[]> {
    try {
      return this.jobsService.createData(body);
    } catch (error) {
      throw new HttpException(400, { id: 1, message: `${error}` });
    }
  }
  @Patch('/:id')
  updateData(@Param('id') id: string, @Body() body: any): Promise<iJobs[]> {
    try {
      if (isNaN(+id)) throw new Error('Parametr typeof = String');
      return this.jobsService.updateData(id, body);
    } catch (error) {
      throw new HttpException(400, { id: 1, message: `${error}` });
    }
  }
  @Delete(':id')
  deleteData(@Param('id') id: string): Promise<iJobs[]> {
    try {
      if (isNaN(+id)) throw new Error('Parametr typeof = String');
      return this.jobsService.deleteData(id);
    } catch (error) {
      throw new HttpException(400, { id: 1, message: `${error}` });
    }
  }
}
