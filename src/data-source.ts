import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [isDevelopment ? "src/model/*.ts" : "dist/model/*.js"],
  migrations: [isDevelopment ? "src/migration/*.ts" : "dist/migration/*.js"],
  subscribers: [isDevelopment ? "src/subscriber/*.ts" : "dist/subscriber/*.js"],
});
