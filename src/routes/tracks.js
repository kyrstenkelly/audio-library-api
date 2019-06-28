const COLLECTION = 'fs.files';

export default {
  /**
   * Get the information for all tracks
   */
  getTracks: (_, res, db) => {
    db.collection(COLLECTION).find().toArray((err, tracks) => {
      if (err) {
        res.statusMessage = `Could not get tracks: ${err.message}`;
        res.status(400).end();
      }
      const tracksInfo = tracks.map(t => t.metadata);
      res.send(tracksInfo);
    });
  },

  /**
   * TODO!
   * Get track by filename
   */
  // getTrack: (req, res, db) => {},

  /**
   * TODO!
   * Create track
   *
   * @param file { mp3 file, required } The audio file
   * @param title { string, required } The title of the track
   * @param artist { string, optional } The artist of track
   * @param album { string, optional } The album of the track
   */
  // createTrack: (req, res, db) => {},

  /**
   * TODO!
   * Update track
   */
  // updateTrack: (req, res, db) => {},

  /**
   * TODO!
   * Delete track
   */
  // deleteTrack: (req, res, db) => {}
}
