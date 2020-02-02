import "reflect-metadata";
import dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { Container } from "typedi";
import { buildSchema } from "type-graphql";

import { resolvers } from './app';
import { connectDatabase } from "./database";
import { logger } from "./logger";

async function setupGraphQL(app: express.Application) {
  const schema = await buildSchema({
    resolvers,
    container: Container,
  });

  const apollo = new ApolloServer({
    schema,
    playground: true
  });

  apollo.applyMiddleware({ app });
}

dotenv.config();

async function main() {
  const app = express();

  // Add to container
  const db = await connectDatabase();
  db.synchronize();
  setupGraphQL(app);

  app.get('/', (_, res) => res.send('derp'))

  app.listen(8080, () => {
    logger.info('server started')
  });
}

main();