import { MongoClient, Db } from 'mongodb';
import Logger from '../helper/logger';
import * as DotEnv from 'dotenv';

class DbClient {
    public db: Db;
    public mongoClient: MongoClient;

    public async connect(): Promise<Db> {
        try {
            DotEnv.config();

            Logger.info('MongoDB - Connecting...');

            this.mongoClient = await MongoClient.connect(
                process.env.MONGO_DB,
                { useNewUrlParser: true },
            );

            this.db = this.mongoClient.db();

            Logger.info('MongoDB - Connected to mongodb.');

            return this.db;
        } catch (error) {
            Logger.info(`MongoDB - Connection with mongodb failed due to ${error}`);
        }
    }
}

export default new DbClient();
