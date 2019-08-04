const { broadcast } = require('./broadcast');
const { getUsers } = require('./handlers');

exports.refreshClients = async (wss) => {
  const users = await getUsers();
  const data = JSON.stringify(users);
  broadcast(wss, data);
  console.log('> ALL CLIENTS UPDATED');
};

exports.refreshClient = async (ws) => {
  const users = await getUsers();
  const data = JSON.stringify(users);
  ws.send(data);
  console.log('> ALL USERS RETURNED');
};
