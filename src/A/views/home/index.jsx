import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Home() {
    return (
        <section className="home">
            <h2>Hi,Friend!</h2>
            <nav>
                <Link to="/A">Friend</Link>
                <Link to="/A/about">World</Link>
            </nav>
        </section>
    );
}

export default Home;
