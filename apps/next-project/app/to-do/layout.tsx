
import { ApolloWrapper } from "../lib/apollo-wrapper";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode,
  }) {
    return (
      <>
      <html lang="en">
        
        <body suppressHydrationWarning={true}>
          <ApolloWrapper>
            {children}</ApolloWrapper>
        </body>
      </html>
      </>
    );
  }