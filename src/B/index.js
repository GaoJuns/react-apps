import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import 'lib-flexible';
import '@antd2x/es/global';
import './style.css';

import Route from './views/router';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Route />);
