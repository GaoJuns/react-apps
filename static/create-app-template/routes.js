import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './views/App';
import Home from './views/home';
import About from './views/about';
import NotFound from './views/NotFound';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/B" element={<App />}>
                <Route index element={<Home />}></Route>
                <Route path="home" element={<Home />}></Route>
                <Route path="about" element={<About />}></Route>
            </Route>
            <Route path="/404" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/B" />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
