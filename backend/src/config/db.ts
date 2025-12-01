import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    // Create in-memory MongoDB instance
    // Using 7.0.3+ which is compatible with Debian 12 x86_64
    mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '7.0.3',
      },
    });
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    console.log('MongoDB Memory Server started successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    if (mongoServer) {
      await mongoose.disconnect();
      await mongoServer.stop();
      mongoServer = null;
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};
