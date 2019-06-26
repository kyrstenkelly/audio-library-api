import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (_, res) => {
  res.send('Audio Library API. Please see <a href="https://github.com/kyrstenkelly/audio-library-api">docs</a> for usage.');
});

app.get('/tracks', routes.getTracks);

app.server = app.listen(3000, () => {
  console.log("Server running on port 3000");
});

export default app;
