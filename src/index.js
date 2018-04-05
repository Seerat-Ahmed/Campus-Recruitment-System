import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import MyRounter from './component/Router/MyRounter';
import * as firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);

ReactDOM.render(
    <Provider store={store}>
        <MyRounter />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
