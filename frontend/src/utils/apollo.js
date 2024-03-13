import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';


// const envTest = process.env.NEXT_PUBLIC_GRAPHQL_URL;

// const link = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
//   fetchOptions: {
//     mode: 'cors',
//   },
// });

// TODO working but still having issue with the image upload from frontend
const link = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  // cant use "credentials" when origin is set to "*", which it currently is
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
    credentials: 'include',
  },
});

const client = new ApolloClient({
  // uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  // credentials: 'include',
  link: link,
  ssrMode: true,
});

export default client;
