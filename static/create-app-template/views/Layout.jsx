import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <section className="layout">
            <nav>
                <Link to="/">Friend</Link>
                <Link to="/about">World</Link>
            </nav>
            <Outlet />
        </section>
    );
}

export default App;
