import mongoose from 'mongoose';

const DATABASE_MONGO_ATLAS: string = process.env.DATABASE_MONGO_ATLAS || '';
const DATABASE_SERVER: string = process.env.DATABASE_SERVER || 'localhost';
const DATABASE_PORT: string = process.env.DATABASE_PORT || '27017';
const DATABASE_USERNAME: string = process.env.DATABASE_USERNAME || '';
const DATABASE_PASSWORD: string = process.env.DATABASE_PASSWORD || '';
const DATABASE_NAME_DB: string = process.env.DATABASE_NAME_DB || 'name_db';

const userDB: string = DATABASE_USERNAME !== '' ? `${DATABASE_USERNAME}:${DATABASE_PASSWORD}@` : '';
const path_db: string =
  DATABASE_MONGO_ATLAS !== ''
    ? DATABASE_MONGO_ATLAS
    : `mongodb://${userDB}${DATABASE_SERVER}:${DATABASE_PORT}/${DATABASE_NAME_DB}`;

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(path_db);
    console.log('*** Connection database success! ***');
    console.log('');
  } catch (error) {
    throw new Error('Error to connect database');
  }
};
