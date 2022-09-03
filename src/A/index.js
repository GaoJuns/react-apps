import React, { useState } from 'react'
import ReactDOM from 'react-dom/client';
import config from './assets/js/appEnvConfig'

function App() {

    const [count, setCount] = useState(0)

    return (
        <div>
            hello，friend!

            <div>
                头像：
            </div>

            <div>
                {count}
            </div>

            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);