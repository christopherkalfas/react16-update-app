import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as Sentry from '@sentry/browser'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Sentry.init({dsn: "https://81b48548d8514e0fa6bf70da4c4ef27c@sentry.io/2246754"})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
