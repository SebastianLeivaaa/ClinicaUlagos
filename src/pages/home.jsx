import React from 'react';
import { NavBar } from '../components/NavBar';
import { AccordionSection } from '../components/accordionSection';

export const Home = () => {
    return(
        <div className="w-full">
            <NavBar/>
            <AccordionSection/>
        </div>
    );
}