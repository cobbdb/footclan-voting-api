const { setupDB } = require('./db');

exports.getUsers = async () => {
  const { collection } = await setupDB();

  return new Promise((resolve, reject) => {
    collection.find().toArray((err, users) => {
      if (err) {
        reject(err);
      } else {
        const body = JSON.stringify(users);
        resolve(users);
      }
    });
  });
};

exports.putUser = async (username, data) => {
  const { collection } = await setupDB();

  return new Promise((resolve, reject) => {
    collection.updateOne({ username }, data, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};
