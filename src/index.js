import 'babel-polyfill';
import express from 'express';
import configureRoutes from './routes';
import initDb from './db/index';
import seed from './db/seed';

require('dotenv').config()
const app = express();

const appPromise = initDb().then((database) => {
  const port = process.env.SERVICE_PORT;

  if (process.env.AUTOSEED) {
    seed(database);
  }

  configureRoutes(app, database);

  app.server = app.listen(port, () =>
    console.log(`Server listening on port ${port}`),
  );

  return app;
}).catch(e => console.error(e));

export default appPromise;
