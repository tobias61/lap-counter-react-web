import {
    ApolloProvider,
} from 'react-apollo'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import client from './store/apollo'
import store from './store/store'

ReactDOM.render(<ApolloProvider store={store} client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));
registerServiceWorker();
