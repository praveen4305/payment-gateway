import * as express from 'express';
import * as cors from 'cors';
import { MongoDatabase } from './config/db.config';
import { PaymentGateway } from './PaymentGateway/PaymentGateway';
 
export class ExpressServer {
    private server?: express.Express;

    constructor(private paymentsGateway: PaymentGateway, private mongoDb: MongoDatabase) {}

    public async setup(port: number) {
        const server = express();
        this.setupStandardMiddlewares(server);
        this.configureApiEndpoints(server);
        this.listen(server, port);
        await this.callMongodb();

        this.server = server;
        return this.server;
    }

    private listen(server: express.Express, port: number) {
        console.info(`Starting server on port ${port}`)
        return server.listen(port);
    }

    private setupStandardMiddlewares(server: express.Express) {
        server.use(cors());
        server.use(express.json());
    }

    private configureApiEndpoints(server: express.Express) {
        server.post('/api/payment-request', this.paymentsGateway.createOrder);
        server.get('/api/callback', this.paymentsGateway.callback);
        server.post('/api/refund', this.paymentsGateway.initiateRefund);
        server.post('/api/cancel-order', this.paymentsGateway.cancelOrder);
    }

    public async callMongodb() {
        await this.mongoDb.connectToDatabase();
    }

}


