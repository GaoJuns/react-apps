import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Friend from './friend';
import World from './world';
import Details from './details';
import NotFound from './NotFound';

const APP_NAME = '/' + process.env.APP_NAME;

function App() {
    return (
        <BrowserRouter basename={APP_NAME}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Friend />} />
                    <Route path="/friend" element={<Friend />} />
                    <Route path="/world" element={<World />} />
                </Route>
                <Route path="/details" element={<Details />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
