import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logoClinica from "../assets/img/logoClinica.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { formatDate } from "../utils/formatedDate.js";
import { FaHandPointRight } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';





export const TimeReservationFinal = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const infoReservation = location.state.infoReservation;
    console.log(infoReservation);
    return(
        <>
            <header>
                <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full'></img>
                </div>
            </header>
            <div className='p-16 bg-gradient-to-r from-blue-800 from-40% to-blue-500'>
                <h1 className="text-white-50 text-5xl font-black text-center">Agenda tu hora</h1>
            </div>
            <div className="flex flex-col p-4 gap-y-16">
                <div className="bg-green-300 p-4 rounded-xl flex flex-row items-start gap-x-4">
                    <IoMdCheckmarkCircleOutline className="text-2xl"/> <p className="text-green-900">Hemos enviado un correo electrónico a <strong>{infoReservation.email}</strong> con la confirmación de su reserva de hora (Si no lo encuentra en su bandeja, revise su bandeja de Spam).</p>
                </div>
                <div className="flex flex-row max-lg:flex-col gap-y-12">
                    <div className="w-[60%] pr-24 flex flex-col max-lg:w-[100%] max-md:pr-0">
                        <div className="shadow-gray-900 shadow-3xl rounded-xl py-0 flex flex-col">
                            <div className='w-[100%] rounded-t-xl shadow-gray-900 shadow-3xl bg-blue-600 text-lg text-white-50 flex flex-row gap-x-4 font-bold items-center p-4'>
                                <FaCalendarAlt /> {formatDate(infoReservation.dateReservation)}
                            </div>
                            <div className='flex flex-row p-8'>
                                <div className="w-[25%] h-auto max-md:w-[40%]">
                                    <img src={infoReservation.imgProf} className="object-cover"/>
                                </div>
                                <div className="w-[75%] max-md:w-[60%] px-12 py-0 max-md:pl-8 flex flex-col gap-y-6 justify-start h-auto items-start">
                                    <div className="flex flex-col items-start">
                                        <h2 className="text-2xl font-bold text-blue-950 max-md:text-lg">{infoReservation.nameProf} {infoReservation.lastNamePatProf} {infoReservation.lastNameMatProf}</h2>
                                        <h3 className="text-xl font-semibold text-blue-500 max-md:text-base">{infoReservation.specialtyReservation}</h3>
                                        <span className="bg-blue-500 w-auto max-md:text-sm mt-4 max-md:mt-2 py-2 px-4 text-white-50 rounded-md font-semibold flex flex-row items-center gap-x-2 flex-wrap justify-center"><FaClock className="text-xl max-md:text-base text-white-50"/> {infoReservation.hourReservation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[40%] gap-y-4 items-start justify-center max-md:w-[100%] max-md:items-center max-md:mb-24 max-md:justify-start">
                        <h1 className="flex flex-row items-center gap-x-4 text-blue-950 font-bold text-lg"><FaHandPointRight className="text-green-600 text-xl"/> Recomendaciones</h1>
                        <ul className="list-disc text-blue-950 ml-4">
                            <li>Llegar 15 minutos antes de la hora reservada</li>
                            <li>Anular al menos un dia antes de su cita.</li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button onClick={() => {navigate('/');}} className="text-white-50 mt-4 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-6 flex flex-row items-center gap-x-1 w-auto font-bold"><IoHome className="text-xl"/> VOLVER AL INICIO</button>
                </div>
            </div>
        </>
    );
}