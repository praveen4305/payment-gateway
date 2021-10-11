import { Request, Response } from 'express';
import { InstamojoPayments } from '../Controllers/instamojo-payments';

export class PaymentGateway {
    clientId?: string;
    secret?: string;
    payments?: any;

    public createOrder(req: Request, res: Response) {
        this.payments = new InstamojoPayments();
        this.payments.paymentRequest(req, res);
    }

    public initiateRefund(req: Request, res: Response) {

    }

    public cancelOrder(req: Request, res: Response) {

    }

    public callback(req: Request, res: Response) {
        this.payments.callback(req, res);
    }
}