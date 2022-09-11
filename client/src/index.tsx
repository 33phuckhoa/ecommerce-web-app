import React from  'react';
import ReactDom from 'react-dom';
import {} from 'react-router-dom';
import App from './App';
import {store} from './redux/store';
import {Provider} from 'react-redux';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
)