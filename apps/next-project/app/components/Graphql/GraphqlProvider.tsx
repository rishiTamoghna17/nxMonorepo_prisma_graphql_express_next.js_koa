'use client';
// import useGetMe from '../queries/useGetme';

import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import React from 'react';

 const ApolloProviders = ({ children }: { children: React.ReactNode }) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:8000/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('authToken');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default ApolloProviders