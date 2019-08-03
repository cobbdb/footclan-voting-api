const { setupDB } = require('./db');

exports.getUsers = () => {
  const { collection } = setupDB();

  return new Promise((resolve, reject) => {
    collection.find().toArray((err, users) => {
      if (err) {
        console.log('!!! ERROR', Object.keys(err), err);
        reject(err);
      } else {
        const body = JSON.stringify(users);
        console.log('!!! SENDING', body);
        resolve(users);
      }
    });
  });
};

exports.putUser = (username, data) => {
  const { collection } = setupDB();

  return new Promise((resolve, reject) => {
    collection.updateOne({ username }, data, (err, user) => {
      if (err) {
        console.log('!!! ERROR', Object.keys(err), err);
        reject(err);
      } else {
        console.log('!!! RETRIEVED', user);
        resolve(user);
      }
    });
  });
};
