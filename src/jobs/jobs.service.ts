import { Injectable } from '@nestjs/common';
import HttpException from 'src/exceptions/HttpException';
import iJobs from 'src/interfaces/interfaces';
import { DatabaseService } from 'src/storage/database.service';

@Injectable()
export class JobsService {
  constructor(private db: DatabaseService) {}

  async getData(): Promise<iJobs[]> {
    try {
      const sql = 'SELECT * FROM jobs ORDER BY id';
      return await this.db.query(sql);
    } catch (error: any) {
      throw new HttpException(400, { id: 1, message: `${error.message}` });
    }
  }

  async getDataById(id: string): Promise<iJobs[]> {
    try {
      const sql = `SELECT * FROM jobs WHERE id = ${id}`;
      const data = await this.db.query(sql);
      if (!data.length) throw new Error('There are not this ID');
      return data;
    } catch (error: any) {
      throw new HttpException(400, { id: 1, message: `${error.message}` });
    }
  }

  async createData(body: Partial<iJobs>): Promise<iJobs[]> {
    try {
      const values = Object.values(body);
      const sql = `INSERT INTO jobs (title, company, description, salaryFrom, salaryTo, currency, location, remote, employmentType, experience, skills) VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, ARRAY[$11]) RETURNING *`;
      return await this.db.query(sql, values);
    } catch (error: any) {
      throw new HttpException(400, { id: 1, message: `${error.message}` });
    }
  }

  async updateData(id: string, body: Partial<iJobs>): Promise<iJobs[]> {
    try {
      if (!(await this.getDataById(id)).length)
        throw new Error('There are not this ID');

      const fields = Object.keys(body).filter((key) => key !== 'id');
      const values = fields.map((field) => body[field as keyof iJobs]);

      const setClause = fields
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ');

      const sql = `UPDATE jobs set ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

      const result = await this.db.query(sql, [...values, id]);
      return result;
    } catch (error: any) {
      throw new HttpException(400, { id: 1, message: `${error.message}` });
    }
  }
  async deleteData(id: string): Promise<iJobs[]> {
    try {
      if (!(await this.getDataById(id)).length)
        throw new Error('There are no this ID');

      const sqlDelete = 'DELETE FROM jobs WHERE id = $1;';
      const sqlAllSelected = 'SELECT * FROM jobs';
      await this.db.query(sqlDelete, [id]);
      const data = await this.db.query(sqlAllSelected);
      if (!data.length) throw new Error('List is clear');

      return data;
    } catch (error: any) {
      throw new HttpException(401, { id: 1, message: `${error.message}` });
    }
  }
}
