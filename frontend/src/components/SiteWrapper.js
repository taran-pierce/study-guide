'use client'

import { ApolloProvider } from "@apollo/client";
import client from '../utils/apollo';
import { ProfileProvider } from '../utils/useProfile';

export default function SiteWrapper({ children }) {
  return (
    <ApolloProvider client={client}>
      <ProfileProvider>
        {children}
      </ProfileProvider>
    </ApolloProvider>
  );
}
