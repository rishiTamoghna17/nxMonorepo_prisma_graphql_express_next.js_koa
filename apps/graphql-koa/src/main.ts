/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import UserResolver from "./modules/user/user.resolver"
import Koa from 'koa';
import { prisma } from "@xyz/prisma";
import { veryfyjwt } from "./utils/jwt";
import { Users } from "./modules/user/user.dto";
import Context from "./type/context";
import { GraphQLError } from 'graphql';
(async () => {
    const app = new Koa();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ( ctx:Context ) => {
            const context = ctx
            const jwt = (context.ctx.headers.authorization || ' ').split(' ')[1];
            // console.log(jwt);
            if (!jwt) {
              throw new GraphQLError('Missing authorization header', {
                extensions: {
                  code: 'UNAUTHENTICATED',
                  http: { status: 401 },
                },
              });
            }
            
            return context;
        }, 
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const port = process.env.PORT || 5000;

    app.listen(port, () => {
        console.log(`🚀⚙️  Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
    });

    return { apolloServer, app };
})();