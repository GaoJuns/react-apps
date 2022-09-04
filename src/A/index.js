import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import 'lib-flexible';
import 'antd-mobile/es/global';

import Home from './views/home';

function App() {
    return (
        <Fragment>
            <Home />
        </Fragment>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
