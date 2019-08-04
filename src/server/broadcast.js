const WebSocket = require('ws');
const { getUsers } = require('./handlers');

export const broadcast = (wss, data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

export const refreshClients = async (wss) => {
  const users = await getUsers();
  const data = JSON.stringify(users);
  broadcast(wss, data);
  console.log('> ALL CLIENTS UPDATED');
};
