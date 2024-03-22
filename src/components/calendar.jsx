import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

export const Calendar = ( { hoursAvailable, firstHourAvailable, inputTargetDate, handleTargetDateFromChild } ) => {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 
        'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 
        'Octubre', 'Noviembre', 'Diciembre'
    ];
    const today = new Date(firstHourAvailable);

    const formattedDates = hoursAvailable.map(isoDateString => {
        const date = new Date(isoDateString);
        return date.toISOString().split('T')[0];
    });

    const [month, setMonth] = useState(today.getMonth());
    const [year, setYear] = useState(today.getFullYear());
    const [targetDate, setTargetDate] = useState(inputTargetDate);


    // Función para determinar si el año es bisiesto o no
    function leapYear(year) {
        return year % 4 === 0 ? true : false;
    }

    // Función para obtener el total de días en un mes
    function getTotalDays(month, year) {
        if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
            return 31;
        } else if (month === 1 && leapYear(year)) {
            return 29;
        } else if (month === 1 && !leapYear(year)) {
            return 28;
        } else {
            return 30;
        }
    }

    const handleNextMonth = () => {
        if (month !== 11) {
            setMonth(month + 1);
        } else {
            setYear(year + 1);
            setMonth(0);
        }
    };

    const handlePrevMonth = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
    
        if (year > currentYear || (year === currentYear && month > currentMonth)) {
            if(month === 0){
                setMonth(11);
                setYear(year - 1);
            }else{
                setMonth(month - 1);
            }
        }
    };

    const handleTargetDateChild = (value) => {
        setTargetDate(value);
        handleTargetDateFromChild(value);
    }

    const renderDays = () => {
        const daysArray = [];
        const totalDays = getTotalDays(month, year);
        const start = new Date(year, month, 1);
        let startDays = start.getDay();

        if(startDays === 0){
            startDays = 7;
          }
        for (let i = (2-startDays); i <= totalDays; i++) {
            const paddedMonth = (month + 1).toString().padStart(2, '0');
            const paddedDay = i.toString().padStart(2, '0');
            const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

            let buttonStyle = "rounded-full w-7 h-7";
            let buttonActive = false;
            if(i < 1){
                let totalDaysPrevMonth = getTotalDays(month-1);
                buttonStyle = "rounded-full w-7 h-7 text-gray-400";
                daysArray.push(<button 
                                    className={buttonStyle} 
                                    value={`${year}-${month + 1}-${i}`} 
                                    key={`${year}-${month + 1}-${i}`}
                                    disabled={!buttonActive}
                                >
                                    {totalDaysPrevMonth + i}
                                </button>);
            }else{
                if (formattedDates.includes(formattedDate)) {
                    if(formattedDate == targetDate){
                        buttonStyle = "bg-blue-950 rounded-full w-7 h-7 text-white-50";
                        buttonActive= true;
                    } else {
                        buttonStyle = "bg-green-600 rounded-full w-7 h-7 text-white-50";
                        buttonActive= true;
                    }
                } else {
                    buttonStyle = "rounded-full w-7 h-7";
                    buttonActive= false;
                }
                daysArray.push(<button 
                    className={buttonStyle} 
                    value={formattedDate} 
                    key={formattedDate}
                    disabled={!buttonActive}
                    onClick={() => handleTargetDateChild(formattedDate)}
                >
                    {i}
                </button>);
            }
        }
        return daysArray;
    };

    useEffect(() => {
    }, [month, year, targetDate]);

    return (
        <div className="flex flex-col sticky top-4 gap-y-4">
            <div className="w-full bg-gradient-to-bl from-blue-800 from-50% to-blue-500 p-4 text-white-50 rounded-xl gap-y-3 flex flex-col">
                <div className="text-2xl flex flex-row justify-between items-center">
                    <button onClick={handlePrevMonth} className="hover:text-blue-500"><MdKeyboardArrowLeft className="text-4xl"/></button>{`${months[month]} ${year}`} <button onClick={handleNextMonth} className="hover:text-blue-500"><MdKeyboardArrowRight className="text-4xl"/></button>
                </div>
                <div className="grid grid-cols-7 text-s ml-4 gap-x-4">
                    <span>Lun</span>
                    <span>Mar</span>
                    <span>Mie</span>
                    <span>Jue</span>
                    <span>Vie</span>
                    <span>Sab</span>
                    <span>Dom</span>
                </div>
                <div className="grid grid-cols-7 text-s ml-4 text-center gap-x-4 gap-y-2">
                    {renderDays()}
                </div>
            </div>
            <div className="flex flex-col gap-y-2">
            <div className="flex flex-row gap-x-4 items-center"><div className="h-5 w-5 rounded-full bg-blue-950 p-2"></div><p className="font-semibold text-base text-blue-950">Fecha seleccionada</p></div>
            <div className="flex flex-row gap-x-4 items-center"><div className="h-5 w-5 rounded-full bg-green-600 p-2"></div><p className="font-semibold text-base text-blue-950">Dia con cita médica disponible</p></div>
            </div>
        </div>
        
    );
}
