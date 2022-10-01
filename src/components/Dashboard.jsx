import React from 'react';
import { Route, Routes } from 'react-router';
import SecertComp from './SecertComp';

const Dashboard = () => {

    return (
        <div>
            <Routes>
                <Route path='/secret' element={<SecertComp />} />
            </Routes>
        </div>
    );
};

export default Dashboard;