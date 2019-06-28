import 'babel-polyfill';
import express from 'express';
import routes from './routes';
import { initDb } from './db/index';
import seed from './db/seed';

require('dotenv').config()
const app = express();

initDb().then((database) => {
  const port = process.env.SERVICE_PORT;

  if (process.env.AUTOSEED) {
    seed(database);
  }

  app.get('/', (_, res) => {
    return res.send('Audio Library API. Please see <a href="https://github.com/kyrstenkelly/audio-library-api">docs</a> for usage.');
  });

  app.get('/tracks', routes.getTracks);

  app.server = app.listen(port, () =>
    console.log(`Server listening on port ${port}`),
  );
}).catch(e => console.error(e));

export default app;
