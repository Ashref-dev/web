import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    // Create in-memory MongoDB instance with a compatible version
    mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '7.0.3', // Minimum version supported for Debian 12
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
