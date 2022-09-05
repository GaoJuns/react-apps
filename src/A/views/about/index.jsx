import React from 'react';
import { Link } from 'react-router-dom';

function About() {
    return (
        <section className="about">
            <h2>Hello,World!</h2>

            <nav>
                <Link to="/A">Friend</Link>
                <Link to="/A/about">World</Link>
            </nav>
        </section>
    );
}

export default About;
