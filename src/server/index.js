const WebSocket = require('ws');
const { setupDB } = require('./db');

exports.startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    console.log('Connection accepted.');
    const db = setupDB();

    ws.on('message', (message) => {
      console.log('received: %s', message);
    });

    ws.send('something');
  });
};
