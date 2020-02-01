import "reflect-metadata";
import dotenv from 'dotenv';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from "type-graphql";

import { resolvers } from './app';
import { connectDatabase } from "./database";

async function setupGraphQL(app: express.Application) {
  const schema = await buildSchema({
    resolvers,
  });

  const apollo = new ApolloServer({
    schema,
    playground: true
  });

  apollo.applyMiddleware({ app });
}

dotenv.load();
async function main() {
  const app = express();

  connectDatabase();
  setupGraphQL(app);

  app.get('/', (_, res) => res.send('derp'))

  app.listen(8080, () => {
    console.log('server started')
  });
}

main();