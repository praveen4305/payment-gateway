import { Environment } from './Environment';
import { ExpressServer } from "./ExpressServer";
import { MongoDatabase } from './config/db.config';
import { PaymentGateway } from './PaymentGateway/PaymentGateway';

export class Application {
    public static async createApplication() {
        const expressServer = new ExpressServer(new PaymentGateway(), new MongoDatabase());
        await expressServer.setup(Environment.getPortNumber());
        return expressServer;
    }
}