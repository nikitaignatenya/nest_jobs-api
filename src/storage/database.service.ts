// database.service.ts
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '12345678',
      database: 'nest_jobs-api',
    });
  }

  async onModuleInit() {
    await this.client.connect();
    console.log('Connected to PostgreSQL');
  }

  async onModuleDestroy() {
    await this.client.end();
    console.log('Disconnected from PostgreSQL');
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const res = await this.client.query(sql, params);
    return res.rows;
  }
}
