import { MongoClient } from 'mongodb';
import config from '../config';

/**
 * Initialize the database and the gridfs stream
 */
const initDb = async () => {
  console.log(`Connecting to url ${config.MONGODB_URI}`);
  // Pass useNewUrlParser option to supress MongoClient deprecation warning
  return await MongoClient.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .catch((e) => { throw new Error(e); });
};

export default initDb;
