import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
    return (
        <section className="layout">
            <Outlet />
            <nav>
                <Link to="/">Friend</Link>
                <Link to="/world">World</Link>
                <Link to="/details">Details</Link>
            </nav>
        </section>
    );
}

export default App;
