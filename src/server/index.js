const WebSocket = require('ws');
const { getUsers, putUser } = require('./handlers');
const { refreshClients, refreshClient } = require('./clients');

exports.startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('Connection accepted.');

    // Load fresh data into new clients.
    try {
      refreshClient(ws);
    } catch (err) {
      console.log('> [ERROR]', err.message);
    }

    ws.on('message', async (message) => {
      console.log('received: %s', message);
      const [method, endpoint, username, body] = message.split('/');

      switch (endpoint.toLowerCase()) {
        case 'users': {
          try {
            refreshClient(ws);
          } catch (err) {
            console.log('> [ERROR]', err.message);
          }
          break;
        }
        case 'user': {
          try {
            const data = JSON.parse(body);
            await putUser(data.username, data);
            console.log(`> USER ${username} UPDATED`);

            // Broadcast the change to everyone else.
            refreshClients(wss);
          } catch (err) {
            console.log('> [ERROR]', err.message);
          }
          break;
        }
        default:
          console.log(`> UNKONWN ENDPOINT ${method}:${endpoint}`);
      }
    });
  });
};
