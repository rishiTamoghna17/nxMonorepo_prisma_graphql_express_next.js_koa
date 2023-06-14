export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};
import ApolloProviders from './components/Graphql/GraphqlProvider';
import Navbar from './components/Navbar';
import Providers from './components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ApolloProviders>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </ApolloProviders>
      </body>
    </html>
  );
}
// import { ApolloWrapper } from "./lib/apollo-wrapper";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode,
// }) {
//   return (
//     <>
//     <html lang="en">

//       <body suppressHydrationWarning={true}>
//         <ApolloWrapper>
//         <Navbar/>
//           {children}</ApolloWrapper>
//       </body>
//     </html>
//     </>
//   );
// }
