import React, { useState } from 'react';
import { AccordionOption } from './accordionOption';

export const AccordionSection = () => {
    return(
        <section className=''>
            <AccordionOption title="Reserva tu hora" bgColor="bg-blue-400" textColor="text-white-50"/>
            <AccordionOption title="Tu historial médico" bgColor="bg-blue-800" textColor="text-white-50"/>
            <AccordionOption title="Anulación de horas" bgColor="bg-red-500" textColor="text-white-50"/>
        </section>
    );
}