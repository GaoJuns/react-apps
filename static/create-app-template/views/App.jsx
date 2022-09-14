import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Friend from './home';
import About from './about';
import NotFound from './NotFound';

const APP_NAME = '/' + process.env.APP_NAME;

function App() {
    return (
        <BrowserRouter basename={APP_NAME}>
            <Routes>
                <Route path="/" element={<Friend />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
