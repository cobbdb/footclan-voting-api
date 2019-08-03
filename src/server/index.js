const WebSocket = require('ws');
const { getUsers, putUser } = require('./handlers');

exports.startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('Connection accepted.');

    ws.on('message', (message) => {
      console.log('received: %s', message);
      const [method, endpoint, username, body] = message.split('/');

      switch (endpoint) {
        case 'users': {
          getUsers().then((users) => {
            const data = JSON.stringify(users);
            // ws.send(data);
            console.log('> ALL USERS RETURNED');
          });
          break;
        }
        case 'user': {
          const data = JSON.parse(body);
          putUser(username, data).then(() => {
            console.log(`> USER ${username} UPDATED`);
          });
          break;
        }
        default:
          console.log(`> UNKONWN ENDPOINT ${endpoint}`);
      }
    });
  });
};
