'use client';
// import useGetMe from '../queries/useGetme';

import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

import React from 'react';

 const ApolloProviders = ({ children }: { children: React.ReactNode }) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graphql',
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloProviders