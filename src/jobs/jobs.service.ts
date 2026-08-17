import { Injectable } from '@nestjs/common';
import iJobs from 'src/interfaces/interfaces';
import { jobs } from 'src/storage';

@Injectable()
export class JobsService {
  jobs: iJobs[];
  constructor() {
    this.jobs = jobs;
  }
  getData(): iJobs[] {
    return this.jobs;
  }
  getDataById(id: string): iJobs[] {
    return this.jobs.filter((el) => el.id === +id);
  }
  createData(body: iJobs): iJobs[] {
    this.jobs.push({ ...body, id: this.jobs[this.jobs.length - 1].id + 1 });
    return this.jobs;
  }
  updateData(id: string, body: iJobs[]): iJobs[] {
    const index: number = this.jobs.findIndex((el) => el.id === +id);
    return [
      { ...this.jobs[index], ...body },
      ...this.jobs.filter((el, i) => i !== index),
    ];
  }
  deleteData(id: string): iJobs[] {
    return [...this.jobs.filter((el) => el.id !== +id)];
  }
}
