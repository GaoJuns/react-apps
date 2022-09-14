import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <section className="about">
            <h2>Hello,World!</h2>

            <nav>
                <Link to="/">Friend</Link>
                <Link to="/about">World</Link>
            </nav>
        </section>
    );
}

export default About;
