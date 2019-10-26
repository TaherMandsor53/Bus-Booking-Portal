import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import './components/searchBusCard/searchBus.css';
import './components/busModal/searchBusModal.css';
import 'react-datepicker/dist/react-datepicker.css';
import './components/loginForm/loginForm.css';
import './components/busPayment/busTicketPayment.css';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
