import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';

import { avtar } from '../assets'

function App() {

    const [count, setCount] = useState(0)

    return (
        <div>
            A 页面

            <img src={avtar} style={{ width: 100, height: 100 }} />

            <div>
                {count}
            </div>

            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);