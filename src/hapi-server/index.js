const Hapi = require('@hapi/hapi');
require('dotenv').config();
const { login } = require('./handlers/login');
const { update } = require('./handlers/update');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
  });

  server.route({
    method: 'GET',
    path:'/foot/user/{username}',
    handler: (request) => {
      return `Hi there ${request.params.name}!`;
    },
  });

  await server.start();
  console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
