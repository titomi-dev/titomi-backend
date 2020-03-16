import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'express-async-errors';
import { Container } from "typedi";
import { buildSchema } from "type-graphql";
import passport from "passport";

import { resolvers } from './app';
import { connectDatabase } from "./database";
import { logger } from "./logger";
import { setupPassport } from "./app/auth/passport";

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

async function main() {
  const app = express();

  app.use(express.json());
  app.use(passport.initialize());

  const db = await connectDatabase();
  db.synchronize();
  setupGraphQL(app);

  setupPassport(app);

  app.get('/', (_, res) => res.send('derp'))

  app.listen(8080, () => {
    logger.info('server started')
  });
}

main();