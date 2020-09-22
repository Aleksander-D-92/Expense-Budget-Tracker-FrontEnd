import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Index.css'
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from '@apollo/client';
import {client} from "./config/apolo/ApoloConfig";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
