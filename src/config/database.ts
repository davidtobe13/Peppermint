import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export const client = new MongoClient(process.env.MONGODB_URI!);
export const database = client.db(process.env.DATABASE_NAME);