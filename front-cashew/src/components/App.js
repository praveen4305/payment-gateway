import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Payment from './Payment';
import PaymentComplete from './PaymentComplete';
import PaymentFailed from './PaymentFailed';

const App = () => {
    return (
    <div>
        <h1>Instamojo</h1>
        <HashRouter>
            <Route exact path="/payment-failed" component={PaymentFailed}/>
            <Route exact path="/" component={Payment} />
            <Route exact path="/payment-complete" component={PaymentComplete}/>
        </HashRouter>
    </div>
    );
}
export default App;

