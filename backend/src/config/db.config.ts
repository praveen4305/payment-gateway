import * as mongoose from "mongoose";
import { Environment } from "../Environment";

export class MongoDatabase {
    private dbURI?: string;

    public async connectToDatabase() {
        this.dbURI = Environment.getDbURI();
        try {
            await mongoose.connect(this.dbURI);
            console.log('connect to database');
        }
        catch(err) {
            console.error('Error connecting to db');
            process.exit(1);
        }
    }
}
