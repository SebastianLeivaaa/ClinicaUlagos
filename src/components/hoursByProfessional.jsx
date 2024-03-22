import React, { useState, useRef, useEffect } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaClock } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { Dialog } from '@mui/material';
import { FormConfirmHourByGuest } from "./formConfirmHourByGuest";
import { formatDate } from "../utils/formatedDate.js";
import { FormConfirmHourByUser } from "./formConfirmHourByUser";

export const HoursByProfessional = ({ professional }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrollableLeft, setIsScrollableLeft] = useState(false);
    const [isScrollableRight, setIsScrollableRight] = useState(false);
    const [selectedHour, setSelectedHour] = useState({});
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tab1');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setScrollPosition(containerRef.current.scrollLeft);
            }
        };

        const updateScrollStatus = () => {
            if (containerRef.current) {
                setIsScrollableLeft(containerRef.current.scrollLeft > 0);
                setIsScrollableRight(containerRef.current.scrollWidth > containerRef.current.clientWidth && containerRef.current.scrollLeft < (containerRef.current.scrollWidth - containerRef.current.clientWidth));
            }
        };

        if (containerRef.current) {
            updateScrollStatus();
            containerRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [professional.hours, scrollPosition]); 

    const handleScrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= 200; 
        }
    };

    const handleScrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollLeft += 200;
        }
    };

    const handleHourClick = (hour) => {
        setSelectedHour(hour);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
          case 'tab1':
            return <FormConfirmHourByGuest reservationCode={selectedHour.reservationCode} infoReservation={{hour: selectedHour.hour, date: selectedHour.date, specialty: selectedHour.specialty, nameProf: selectedHour.name, lastNamePatProf: selectedHour.lastNamePat, lastNameMatProf: selectedHour.lastNameMat, imgProf: professional.img}}/>;
          case 'tab2':
            return <FormConfirmHourByUser reservationCode={selectedHour.reservationCode} infoReservation={{hour: selectedHour.hour, date: selectedHour.date, specialty: selectedHour.specialty, nameProf: selectedHour.name, lastNamePatProf: selectedHour.lastNamePat, lastNameMatProf: selectedHour.lastNameMat, imgProf: professional.img}}/>
          default:
            return null;
        }
    };

    return (
        <div className="p-2">
            <div className='shadow-gray-900 shadow-3xl rounded-xl py-0 flex flex-col'>
                <div className='w-[100%] rounded-t-xl shadow-gray-900 shadow-3xl bg-blue-600 text-lg text-white-50 flex flex-row gap-x-4 font-bold items-center p-4'>
                    <FaCalendarAlt /> {formatDate(professional.hours[0].date)}
                </div>
                <div className='flex flex-row p-8'>
                    <div className="w-[25%]">
                        <img src={professional.img} className="object-cover"/>
                    </div>
                    <div className="w-[75%] px-12 py-4 flex flex-col gap-y-6 justify-center">
                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-blue-950">{professional.name} {professional.lastNamePat} {professional.lastNameMat}</h2>
                            <h3 className="text-xl font-semibold text-blue-500">{professional.specialty}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-x-2 px-8 py-4">
                    {isScrollableLeft && 
                        <button onClick={handleScrollLeft} className="text-xl text-blue-950">
                            <MdKeyboardArrowLeft/>
                        </button>
                    }
                    <div ref={containerRef} className="flex flex-row gap-x-8 overflow-hidden transition-all duration-500 scroll-smooth">
                        {professional.hours.map((i, index) => (
                            <button onClick={() => handleHourClick({rut: professional.rut, name: professional.name, lastNamePat: professional.lastNamePat, lastNameMat: professional.lastNameMat, img: professional.img, specialty: professional.specialty, date: i.date, hour: `${i.hour.split(":")[0]}:${i.hour.split(":")[1]}`, reservationCode: i.reservationCode})} key={index} className="bg-white-50 py-2 px-4 text-blue-600 border-blue-600 border-[1px] rounded-md hover:bg-blue-600 hover:text-white-50 font-semibold">
                                {i.hour.split(":")[0]}:{i.hour.split(":")[1]}
                            </button>
                        ))}
                    </div>
                    {isScrollableRight && 
                        <button onClick={handleScrollRight} className="text-xl text-blue-950">
                            <MdKeyboardArrowRight/>
                        </button>
                    }
                </div>
            </div>
            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
                <div className="p-4 flex gap-y-4 flex-col">
                    <div className="flex flex-row justify-between">
                        <p className="text-blue-950 font-bold text-2xl">Confirmar hora</p>
                        <button onClick={handleCloseDialog}>
                            <RxCross2/>
                        </button>
                    </div>
                    <div className="w-[100%] flex flex-row max-md:flex-col gap-y-8">
                        <div className="w-[35%] max-md:w-[100%] flex flex-col gap-y-16">
                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-col w-[75%] h-auto">
                                    <img src={selectedHour.img} className="object-cover"></img>
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl font-bold text-blue-950">{selectedHour.name} {selectedHour.lastNamePat} {selectedHour.lastNameMat}</h2>
                                    <h3 className="text-xl font-bold text-blue-500">{selectedHour.specialty}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-8">
                                <div className="flex flex-row justify-between">
                                    <div className="font-semibold text-lg text-blue-950 flex flex-row gap-x-4 items-center"><FaCalendarAlt className="text-xl text-blue-950" /> <p>{selectedHour.date && formatDate(selectedHour.date)}</p></div>
                                    <div className="bg-white-50 py-2 px-4 text-blue-950 border-blue-950 border-[1px] rounded-md font-semibold flex flex-row items-center gap-x-2"><FaClock className="text-xl text-blue-950"/> <p>{selectedHour.hour}</p></div>
                                </div>
                                <div className="flex flex-row overflow-wrap gap-x-4">
                                    <p className="flex flex-row gap-x-4 text-blue-950"><IoWarning className="text-3xl text-orange-600"/>RECUERDA que puedes anular tu hora con una antelación mínima de 48 horas</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-[65%] max-md:w-[100%] px-16 max-md:px-0">
                            <div className='w-[100%] p-2 font-semibold text-base flex gap-x-8 flex-row max-md:justify-center'>
                                <button onClick={() => handleTabClick('tab1')} className={activeTab === 'tab1' ? 'active text-blue-500 underline underline-offset-8 decoration-2' : 'text-gray-400'}>COMO INVITADO</button>
                                <button onClick={() => handleTabClick('tab2')} className={activeTab === 'tab2' ? 'active text-blue-500 underline underline-offset-8 decoration-2' : 'text-gray-400'}>CON CUENTA</button>
                            </div>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

