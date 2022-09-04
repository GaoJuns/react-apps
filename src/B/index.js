import React from 'react';
import ReactDOM from 'react-dom/client';

import Test from './test';

function App() {
    return (
        <div className="test">
            <Test />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
