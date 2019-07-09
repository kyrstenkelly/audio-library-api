import mongo from 'mongodb';

export default {
  /**
   * Stream a file
   * @param id {string} The filename of the requested file
   *
   * TODO:
   * Figure out why some files play in the browser while some
   * download directly
   */
  getFile: (req, res, db) => {
    const fileName = req.params.id;
    const bucket = new mongo.GridFSBucket(db);
    mongo.GridStore.exist(db, fileName).then(exists => {
      if (!exists) {
        res.status(404);
        res.send('File not found');
        return;
      }
      const downloadStream = bucket.openDownloadStreamByName(fileName);
      downloadStream.pipe(res);
      downloadStream.on('error', (error) => {
        console.log(error);
        res.status(500).send('Error streaming file');
      });
    }).catch(error => {
      console.log(error);
      res.status(500).send('Error streaming file');
    });
  }
};
