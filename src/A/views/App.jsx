import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './home';
import About from './about';
import NotFound from './NotFound';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/A" element={<Home />} />
                <Route path="/A/about" element={<About />} />
                <Route path="/A/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/A/404" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
