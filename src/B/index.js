import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import 'lib-flexible';
import '@antd2x/es/global';
import './styles.css';

import Routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Routes />);
