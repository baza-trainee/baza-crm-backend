import { DataSource } from 'typeorm';
import getConfigValue from '../config/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: getConfigValue('DB_HOST'),
  port: 5432,
  username: getConfigValue('DB_USER'),
  password: getConfigValue('DB_PASS'),
  database: getConfigValue('DB_DATABASE'),
  synchronize: getConfigValue('NODE_ENV') === 'production' ? false : true,
  logging: false,
  entities: ['**/*.entity.*'],
  subscribers: [],
  migrations: [],
  // on schema conflict uncomment !! db cleared
  dropSchema: process.env.NODE_ENV === 'production' ? false : true,
});
