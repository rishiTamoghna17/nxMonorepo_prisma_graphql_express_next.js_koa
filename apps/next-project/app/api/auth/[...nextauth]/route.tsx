import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email:{ label: 'Email', type: 'text', placeholder: "test@exm.com"},
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        const res = await fetch("http://localhost:3000/login",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          ),
        })
        const user = await res.json();
        console.log(user)

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
});


export { handler as GET, handler as POST };
