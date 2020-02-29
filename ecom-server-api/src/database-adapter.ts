import { MongoClient } from 'mongodb';
import {CONFIG} from './config/dev';

export class DatabaseAdapter {


    DatabaseAdapter(){
    }

    async connect(){
        try {
            const connection =  await MongoClient.connect(CONFIG.database.url, { useUnifiedTopology: true });
            const db = await connection.db(CONFIG.database.schema);
            return db;
        } 
        catch(e) {
            console.error(e)
        }

    }
}