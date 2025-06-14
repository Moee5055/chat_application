import { Client } from "pg";

export const pool = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
});
