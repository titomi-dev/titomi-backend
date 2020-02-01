import { createConnection } from "typeorm";
import { entities } from "./app";

export function connectDatabase() {
  return createConnection({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_NAME,

    entities,
  });
}