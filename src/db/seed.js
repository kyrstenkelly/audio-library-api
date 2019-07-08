import fs from 'fs';
import mongo from 'mongodb';
import mockMetadata from './mock-data/metadata';
import config from '../config';

const dataDirectory = `${__dirname}/mock-data`;

export default async (db) => {
  // Only seed in dev mode
  if (config.ENV !== 'development') {
    return;
  }

  const collection = db.collection('fs.files');

  return await collection.findOne().then((existingFile) => {
    // Only seed data if there are no existing files
    if (!existingFile) {
      console.log('Seeding mock data');
      const bucket = new mongo.GridFSBucket(db);

      return mockMetadata.forEach(async (data) => {
        const uploadStream = bucket.openUploadStream(data.filename, {
          metadata: { ...data }
        });

        return await fs.createReadStream(`${dataDirectory}/${data.filename}`)
          .pipe(uploadStream)
          .on('finish', () => console.log(`Successfully stored ${data.filename}`))
          .on('error', (err) => console.error(err));
      });
    } else {
      console.log('Data exists - skipping seed process');
    }
  });
};
