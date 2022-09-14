import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <section className="home">
            <h2>404!</h2>
            <nav>
                <Link to="/">回到首页</Link>
            </nav>
        </section>
    );
}

export default Home;
