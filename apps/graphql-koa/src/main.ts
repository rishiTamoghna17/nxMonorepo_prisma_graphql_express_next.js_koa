/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import Koa from 'koa';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';

import { authcheck } from './utils/authcheck';
import Context from './type/context';
import { prisma } from '@xyz/mylib/prisma';
import UserResolver from './modules/user/user.resolver';
import ProductResolver from './modules/recipe/product.resolver';

const passport = require('koa-passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

(async () => {
  // Initializing Passport
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'very-secret',
  };

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, next) {
      const email = jwt_payload.email;
      prisma.user
        .findUnique({
          where: {
            email: email,
          },
          include: {
            products: true,
          },
        })
        .then((user: any) => {
          if (user) {
            return next(null, user);
          } else {
            return next(null, false);
          }
        })
        .catch((err: any) => {
          return next(err, false);
        });
    })
  );

  const app = new Koa();
  app.use(passport.initialize());

  app.use(async (ctx, next) => {
    return passport.authenticate('jwt', { session: false }, (err, user) => {
      ctx.user = user;
      return next();
    })(ctx, next);
  });

  const schema = await buildSchema({
    resolvers: [UserResolver, ProductResolver],
    authChecker: authcheck,
  });

  const executableSchema = makeExecutableSchema({ typeDefs: schema });

  const server = createServer(app.callback());

  const apolloServer = new ApolloServer({
    schema: executableSchema,
    context: ({ ctx }: { ctx: Context }) => ctx,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const wsServer = new WebSocketServer({
    server,
    path: '/graphql',
  });

  useServer(
    {
      schema: executableSchema,
      execute,
      subscribe,
    },
    wsServer
  );

  const port = process.env.PORT || 5000;

  server.listen(port, () => {
    console.log(`🚀⚙️  Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    console.log(`🚀🔗  Subscriptions ready at ws://localhost:${port}/graphql`);
  });
})();
