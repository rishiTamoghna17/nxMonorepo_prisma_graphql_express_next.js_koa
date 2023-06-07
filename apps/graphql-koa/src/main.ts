/* eslint-disable @typescript-eslint/no-var-requires */

import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import UserResolver from "./modules/user/user.resolver"
import Koa from 'koa';
import { prisma } from "@xyz/mylib/prisma";
import { authcheck } from "./utils/authcheck";
import { Users } from "./modules/user/user.dto";
import Context from "./type/context";
const passport = require('koa-passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


(async () => {
   //initializingPassport//
   const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey : "very-secret"
    }

    passport.use(new JwtStrategy(opts, function(jwt_payload,next) {
        const email = jwt_payload.email;
        prisma.user.findUnique({
            where: {
              email: email,
            },
          }).then((user: any) => {  // Adjusted the type of the resolved value to `any` or the appropriate type
            if (user) {
              return next(null, user);
            } else {
              return next(null, false);
              // or you could create a new account
            }
          }).catch((err: any) => {
            return next(err, false);
          });
        }));


    const app = new Koa();
    app.use(passport.initialize());
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            authChecker: authcheck,
        }),
        context: (({ctx})=>ctx)
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`🚀⚙️  Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });

    return { apolloServer, app };
})();