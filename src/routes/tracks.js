import mongo from 'mongodb';
import mp3Duration from 'mp3-duration';
import streamifier from 'streamifier';

const COLLECTION = 'fs.files';

export default {
  /**
   * Get the information for all tracks
   */
  getTracks: async (_, res, db) => {
    await db.collection(COLLECTION).find().toArray((err, tracks) => {
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
  createTrack: async (req, res, db) => {
    const { album, artist, title } = req.body;
    const file = await req.file;

    if (!file || !title) {
      res.status(400).send('File and Title are required fields');
    }

    const filename = file.originalname;
    const duration = await new Promise((resolve, reject) => {
      mp3Duration(file.buffer, (err, dur) => {
        if (err) reject(err);
        resolve(dur);
      });
    });

    const bucket = new mongo.GridFSBucket(db);
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        album,
        artist,
        duration,
        filename,
        title
      }
    });

    return await streamifier.createReadStream(file.buffer)
      .pipe(uploadStream)
      .on('finish', () => {
        res.send({
          album,
          artist,
          duration,
          filename,
          title
        });
      })
      .on('error', (err) => {
        res.status(500).send(err.message);
      });
  },

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
};
