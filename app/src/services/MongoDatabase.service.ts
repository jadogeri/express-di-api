import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Singleton } from 'typescript-ioc';
import { Service } from '../decorators';
import { BaseDatabase } from '../interfaces/BaseDatabase.interface';

@Singleton
@Service
export class MongoDatabaseService extends BaseDatabase{
  private mongoServer?: MongoMemoryServer;

  public async connect(): Promise<void> {
    let uri: string;

    if (process.env.NODE_ENV === 'test') {
      this.mongoServer = await MongoMemoryServer.create();
      uri = this.mongoServer.getUri();
    } else {
      // Use your actual MongoDB URI for production
      uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/usercrud'; 
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  }

  public async disconnect(): Promise<void> {
    await mongoose.disconnect();
    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
    console.log('MongoDB disconnected');
  }
}
