import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Index.css'
import * as serviceWorker from './serviceWorker';
import 'fontsource-roboto';
import {BrowserRouter} from "react-router-dom";
import {ApolloProvider} from '@apollo/client';
import {client} from "./services/apollo/ApoloConfig";
import {store} from "./config/redux/ReduxStore";
import {Provider} from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
