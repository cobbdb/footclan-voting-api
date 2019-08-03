const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:setupDB');

exports.setupDB = async function () {
  const url = process.env.DB_URL;
  debug(`attempting to connect to database at ${url}`);
  const dbName = 'tasks';
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = await db.collection('footclan');
    return { client: client, collection: collection };
  } catch (err) {
    debug(err);
  }
};
