import NextAuth from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";
export const authOptions: NextAuthOptions = {
  secret: 'my-secret',
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'signin',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        // email: { label: 'Email', type: 'text', placeholder: 'test@exm.com' },
        // password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        // api call
        try {
          const response = await axios.post(
            "http://localhost:3000/login",
            {
              email: credentials?.email,
              password: credentials.password,
            }
          );
          const { data } = response;
          // console.log(data);
          return {
            id: data.id,
            name: data.name,
            email: data.email,
            access_token: data.token,
          };
        } catch (err) {
          // console.log(err);
          return null;
        }

      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log(session, token);
      return {
        ...session,
        user: {
          ...session.user,
          access_token: token.access_token,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          access_token: u.access_token,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
