import { createConnection, useContainer } from "typeorm";
import { Container } from "typedi";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { entities } from "./app";

export function connectDatabase() {
  useContainer(Container);

  return createConnection({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_NAME,

    entities,
    namingStrategy: new SnakeNamingStrategy(),
  });
}