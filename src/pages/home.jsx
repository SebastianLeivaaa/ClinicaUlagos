import React from 'react';
import { NavBar } from '../components/NavBar';
import { PacientOptions } from '../components/pacientOptions';

export const Home = () => {
    return(
        <div className="w-full">
            <NavBar/>
            <PacientOptions/>
        </div>
    );
}