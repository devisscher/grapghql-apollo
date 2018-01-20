import React from 'react';
import { Link } from 'react-router';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const HomePage = ({ data }) => (
  <div>
    <h1>Home</h1>
    <p>{data.hello}</p>
  </div>
);
const hiQuery = gql`
  {
    hello
  }
`;
export default graphql(hiQuery)(HomePage);
