import { Payments } from './Controllers/payments';
import { Environment } from './Environment';
import { ExpressServer } from "./ExpressServer";
import { MongoDatabase } from './config/db.config';

export class Application {
    public static async createApplication() {
        const expressServer = new ExpressServer(new Payments(), new MongoDatabase());
        await expressServer.setup(Environment.getPortNumber());
        return expressServer;
    }
}