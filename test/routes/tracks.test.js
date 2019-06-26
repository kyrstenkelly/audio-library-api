import chai from 'chai';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import tracks from '../../src/routes/tracks';

chai.should();
chai.use(sinonChai);

let req = {
  body: {}
};

describe('Tracks Route', function() {
  describe('#getTracks', function() {
    it('Should respond with a list of tracks', function() {
      const sendSpy = spy();
      tracks.getTracks(req, {
        send: sendSpy
      });
      sendSpy.should.have.been.calledWith(['track1', 'track2']);
    });
  });
});
