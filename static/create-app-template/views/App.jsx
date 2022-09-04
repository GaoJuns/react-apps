import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home';
import About from './about';
import NotFound from './NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
