import fs from 'fs';
import mongo from 'mongodb';
import mockMetadata from './mock-data/metadata';

const dataDirectory = `${__dirname}/mocks/tracks`;

export default (db) => {
  const collection = db.collection('fs.files');

  collection.findOne().then((existingFile) => {
    // Only seed data if there are no existing files
    if (!existingFile) {
      console.log('Seeding mock data');
      const bucket = new mongo.GridFSBucket(db);

      mockMetadata.forEach((data) => {
        const uploadStream = bucket.openUploadStream(data.filename, {
          metadata: { ...data }
        });

        fs.createReadStream(`${dataDirectory}/${data.filename}`)
          .pipe(uploadStream)
          .on('finish', () => console.log(`Successfully stored ${data.filename}`))
          .on('error', (err) => console.error(err));
      });
    }
  });
}
