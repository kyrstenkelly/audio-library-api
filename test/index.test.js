import http from 'http';
import assert from 'assert';
import app from '../src/index.js';

const port = process.env.SERVICE_PORT;
let application;

describe('The server', () => {
  before((done) => {
    app.then((app) => {
      application = app;
      done();
    }).catch((err) => {
      console.error(`Error when starting up app: ${err}`);
    });
  });

  after(() => {
    if (application && application.server) {
      application.server.close();
    }
  });

  it('should return 200', done => {
    http.get(`http://127.0.0.1:${process.env.SERVICE_PORT}`, res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
