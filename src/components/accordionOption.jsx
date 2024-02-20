import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const AccordionOption = ({title , bgColor, textColor}) => {
    const [onToggleOption, setOnToggleOption] = useState(false);


    return(
        <div>
            <div className={`${bgColor} ${textColor} py-16 px-16 text-3xl flex flex-row justify-between`}>
                <button onClick={() => {setOnToggleOption(!onToggleOption)}}>{title}</button>
                <button onClick={() => {setOnToggleOption(!onToggleOption)}} className='text-3xl'>{onToggleOption ? <IoIosArrowUp/> : <IoIosArrowDown />}</button>
            </div>
            {onToggleOption && (
                <div className=''>
                    <h1>Texto prueba</h1>
                </div>
            )}
        </div>
    );
}