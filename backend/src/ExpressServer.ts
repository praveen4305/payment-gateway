import * as express from 'express';
import { Payments } from './Controllers/payments';
import * as cors from 'cors';
import { MongoDatabase } from './config/db.config';
 
export class ExpressServer {
    private server?: express.Express;

    constructor(private paymentsEndpoints: Payments, private mongoDb: MongoDatabase) {}

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
        server.get('/', this.paymentsEndpoints.index);
        server.post('/api/payment-request', this.paymentsEndpoints.paymentRequest);
        server.get('/api/callback', this.paymentsEndpoints.callback);
        server.post('/api/refund', this.paymentsEndpoints.refund);
    }

    public async callMongodb() {
        await this.mongoDb.connectToDatabase();
    }

}


