import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import 'lib-flexible';
import '@antd2x/es/global';

import App from './views/App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
