import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

const main = async () => {
  const prisma = new PrismaClient();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    context: () => ({ prisma }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);

  httpServer.listen({ port: 8000 }, async () => {
    console.log("Server started on http://localhost:8000/graphql");
    new SubscriptionServer(
      {
        execute,
        subscribe,
        schema: await buildSchema({
          resolvers: [TaskResolver],
          validate: false,
        }),
      },
      {
        server: httpServer,
        path: apolloServer.graphqlPath,
      }
    );
  });
};

main().catch((err) => console.error(err));


