const { MongoClient } = require('mongodb');

exports.setupDB = async () => {
  const url = process.env.DB_URL;
  console.log(`> Attempting to connect to database at ${url}...`);

  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db('footclan');
    const collection = await db.collection('footclan');
    return { client: client, collection: collection };
  } catch (err) {
    console.log(err);
  }
};
