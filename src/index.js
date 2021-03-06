import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import configureRoutes from './routes';
import initDb from './db/index';
import seed from './db/seed';
import config from './config';

/**
 * Initialize app & database
 */
const app = express();
const port = config.PORT || 8080;
let mongoClient;

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

export default initDb().then(client => {
  mongoClient = client;

  const database = client.db();

  if (config.AUTOSEED) {
    seed(database);
  }

  configureRoutes(app, database);

  app.server = app.listen(port, () =>
    console.log(`Server listening on port ${port}`)
  );

  return app;
});

/**
 * Gracefully disconnect db when process is killed
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
