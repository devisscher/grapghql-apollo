/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import configureStore from './store/configureStore';
// import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import '../tools/api/register-api';
 
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Router history={browserHistory} routes={routes} />
  </ApolloProvider>
);
// const store = configureStore();

// OLD STUFF USING REDUX
// render(
//   <Provider store={store}>
//     <Router history={browserHistory} routes={routes} />
//   </Provider>,
//   document.getElementById('app')
// );

render(<ApolloApp />, document.getElementById('app'));
