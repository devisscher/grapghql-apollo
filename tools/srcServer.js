import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/* eslint-disable no-console */

// The dev server
const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

app.use(require('webpack-hot-middleware')(compiler));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

// The GraphQL Server
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';

import BoxesSchema from './api/Boxes.graphql';

const testSchema = `
type Query {
  hello: String
  boxes: [Box]
}
`;

// Construct a schema, using GraphQL schema language
const schema = buildSchema(testSchema);

// The root provides a resolver function for each API endpoint
const resolvers = {
  hello: () => {
    return 'Hello world!';
  },
  boxes() {
    return [
      {
        _id: 'asdfasdfasdf',
        greeting: 'Enjoy these cupcakes bro!'
      }
    ];
  }
};

const gapp = express();
gapp.use(cors());
gapp.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);
gapp.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
