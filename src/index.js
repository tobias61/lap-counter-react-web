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
import { LocaleProvider } from 'antd';
import deDE from 'antd/lib/locale-provider/de_DE';



ReactDOM.render(<LocaleProvider locale={deDE}><ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider></LocaleProvider>,
    document.getElementById('root'));
registerServiceWorker();
