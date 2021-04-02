const express = require('express');
const helmet = require('helmet');
const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const { get, set } = require('@parameter1/utils');
const { isProduction } = require('./env');
const schema = require('./schema');

const { STATUS_CODES } = http;

const app = express();
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
app.use(helmet({ contentSecurityPolicy: false }));

app.get('/', (req, res) => {
  res.redirect(301, '/graphql');
});

const path = '/graphql';
const server = new ApolloServer({
  schema,
  tracing: false,
  cacheControl: false,
  introspection: true,
  debug: !isProduction,
  playground: isProduction ? false : { endpoint: path },
  formatError: (err) => {
    const code = get(err, 'extensions.exception.statusCode');
    if (code) set(err, 'extensions.code', STATUS_CODES[code].replace(/\s/g, '_').toUpperCase());
    return err;
  },
});
server.applyMiddleware({ app, path });

module.exports = http.createServer(app);