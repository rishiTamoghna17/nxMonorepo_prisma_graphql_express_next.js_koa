import './global.css';
import Navbar from './components/Navbar/Navbar';
import ApolloProviders from './components/providers/GraphqlProviders';
import Sessionproviders from './components/providers/SessionProviders';

export const metadata = {
  title: 'Welcome to graphql-next-new',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
      <Sessionproviders>
        <ApolloProviders>
          <Navbar />
          {children}
        </ApolloProviders>
        </Sessionproviders>
      </body>
    </html>
  );
}

