import tracks from './tracks';
import staticFiles from './static';

const createHandler = (fn, db) => {
  return (req, res) => {
    fn(req, res, db);
  };
}

const configureRoutes = (app, db) => {
  app.get('/', (_, res) => {
    return res.send(`
      Audio Library API.
      Please see <a href="https://github.com/kyrstenkelly/audio-library-api">docs</a> for usage.
    `);
  });

  // CRUD endpoints for tracks
  app.get('/tracks', createHandler(tracks.getTracks, db));

  // TODO:
  // Endpoints to be implemented
  // app.get('/tracks/:id', createHandler(tracks.getTrack, db));
  // app.post('/tracks', createHandler(tracks.createTrack, db));
  // app.put('/tracks', createHandler(tracks.updateTrack, db));
  // app.delete('/tracks/:id', createHandler(tracks.deleteTrack, db));

  // Static endpoints
  app.get('/static/:id', createHandler(staticFiles.getFile, db));
}

export default configureRoutes;
