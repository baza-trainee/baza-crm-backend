import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'crm',
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: true,
  entities: ['**/*.entity.*'],
  subscribers: [],
  migrations: [],
  // on schema conflict uncomment !! db cleared
  // dropSchema: process.env.NODE_ENV === 'production' ? false : true,
});
