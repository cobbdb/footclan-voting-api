const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 80,
  });

  server.route({
    method: 'GET',
    path:'/greet/{name}',
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
