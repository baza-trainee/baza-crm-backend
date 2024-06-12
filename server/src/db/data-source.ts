import { DataSource } from 'typeorm';
import getConfigValue from '../config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'crm',
  synchronize: getConfigValue('NODE_ENV') === 'production' ? false : true,
  logging: false,
  entities: ['**/*.entity.*'],
  subscribers: [],
  migrations: [],
  // on schema conflict uncomment !! db cleared
  // dropSchema: process.env.NODE_ENV === 'production' ? false : true,
});
