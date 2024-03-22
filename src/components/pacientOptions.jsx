import React, { useState } from 'react';
import { TimeReservation } from './timeReservation';

export const PacientOptions = () => {
    const [activeTab, setActiveTab] = useState('tab1');

  // Función para cambiar la pestaña activa
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <TimeReservation/>;
      case 'tab2':
        return <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo obcaecati fuga aliquam laborum modi. Veniam suscipit unde illo saepe optio quasi, vero neque debitis alias praesentium ducimus dicta, eos exercitationem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eum reiciendis error. Dicta labore voluptates quia cumque sequi, exercitationem cum animi maxime error, tempora debitis blanditiis aspernatur facilis eveniet consequatur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi laboriosam dicta cupiditate impedit perspiciatis, eos debitis ab itaque iure sint sapiente fugit aut enim quam quo consequatur! Itaque, possimus doloribus. lorenm
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi hic eos nihil minus. Non facilis illo ut nam, ipsum asperiores nihil sequi aut at fuga placeat nobis dignissimos aliquid ab. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, ea neque iure incidunt ex reprehenderit at rem sapiente recusandae? Quibusdam, amet deserunt ratione blanditiis cum saepe fugiat necessitatibus maxime hic. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos eligendi modi voluptatibus quibusdam nesciunt architecto aliquid nulla porro beatae, officia cum maxime nisi voluptates dicta voluptas amet magnam nam laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laudantium at modi esse voluptatem facere repellendus ut sint, cum consequuntur veritatis, iure nam, quam hic nesciunt enim reprehenderit provident necessitatibus?
        </div>;
      case 'tab3':
        return <div>Contenido de la pestaña 3</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-[100%] mr-[20%] z-20 max-2xl:w-[100%] max-2xl:px-4 max-2xl:mr-[0%] h-auto">
      <div className='p-16 flex flex-col w-[100%]'>
        <div className='shadow-gray-900 shadow-3xl rounded-lg py-0'>
            <div className='w-[100%]  p-2 font-bold text-base flex gap-x-4'>
                <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active text-blue-500 underline underline-offset-8 decoration-2' : 'text-gray-400'}>HORA MÉDICA</button>
                <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active text-blue-500 underline underline-offset-8 decoration-2' : 'text-gray-400'}>HISTORIAL MÉDICO</button>
                <button onClick={() => handleTabClick('tab3')} className={activeTab === 'tab3' ? 'active text-blue-500 underline underline-offset-8 decoration-2' : 'text-gray-400'}>ANULAR HORA</button>
            </div>
            <div className='p-2 bg-gradient-to-r from-blue-800 from-40% to-blue-500 rounded-b-lg'>
                {renderContent()}
            </div>
        </div>
      </div>
    </div>
  );
}