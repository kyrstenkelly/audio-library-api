import { MongoClient } from 'mongodb';
let mongoClient;

/**
 * Initialize the database and the gridfs stream
 */
const initDb = () => {
  const url = `${process.env.DB_URL}/${process.env.DB_NAME}`;

  console.log(`Connecting to url ${url}`);
  // Pass useNewUrlParser option to supress MongoClient deprecation warning
  return MongoClient.connect(url, { useNewUrlParser: true })
    .then((client) => {
      mongoClient = client;
      return client.db();
    })
    .catch((e) => {
      throw new Error(e);
    });
}

/**
 * Gracefully disconnect when process is killed
 */
process.on('SIGINT', () => {
  if (mongoClient && mongoClient.close) {
    mongoClient.close().then(() => {
      console.log('\nDisconnected from db');
      process.exit();
    });
  } else {
    process.exit();
  }
});

export default initDb;
