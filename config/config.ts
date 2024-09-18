import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load biến môi trường từ file .env

interface IDbConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

const config: { [key: string]: IDbConfig } = {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql', // Hoặc 'postgres', 'sqlite',... tùy vào DB bạn sử dụng
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
  },
};

export default config;
