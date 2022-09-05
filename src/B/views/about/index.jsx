import React from 'react';
import { NavLink } from 'react-router-dom';

function About() {
    return (
        <section className="container">
            <h2>Hello,World!</h2>

            <nav>
                <NavLink to="/B/home">Friend</NavLink>
                <NavLink to="/B/about">World</NavLink>
            </nav>
        </section>
    );
}

export default About;
