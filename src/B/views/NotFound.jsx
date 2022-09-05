import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <section className="container">
            <h2>404!</h2>
            <nav>
                <NavLink to="/B">回到首页</NavLink>
            </nav>
        </section>
    );
}

export default Home;
