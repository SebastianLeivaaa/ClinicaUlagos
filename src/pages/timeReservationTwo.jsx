import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logoClinica from "../assets/img/logoClinica.png";
import { Calendar } from "../components/calendar";
import { capitalize } from "../utils/capitalize.js";
import { HoursByProfessional } from "../components/hoursByProfessional";
import personDefault from "../assets/img/personDefault.jpg";


export const TimeReservationTwo = (props) => {
    const location = useLocation();
    const medicalHoursData = location.state.medicalHoursData;
    const hoursAvailable = medicalHoursData.map(item => item.cita_dis_fecha);
    const firstHourAvailable = medicalHoursData[0].cita_dis_fecha;
    const date = new Date(medicalHoursData[0].cita_dis_fecha);
    const [targetDate, setTargetDate] = useState(date.toISOString().split('T')[0]);

    const professionalsData = {};

    medicalHoursData.forEach(item => {
        let dateHour = new Date(item.cita_dis_fecha);
        let formatedDate = dateHour.toISOString().split('T')[0];
    
        // Verificar si la fecha es la fecha objetivo
        if (formatedDate === targetDate) {
            if (!professionalsData[item.cita_prof_rut]) {
                professionalsData[item.cita_prof_rut] = {
                    rut: item.cita_prof_rut,
                    name: capitalize(item.prof_nombres),
                    lastNamePat: capitalize(item.prof_apellido_pat),
                    lastNameMat: capitalize(item.prof_apellido_mat),
                    img: personDefault,
                    specialty: capitalize(item.espe_nombre),
                    hours: []
                };
            }
    
            professionalsData[item.cita_prof_rut].hours.push({
                date: formatedDate,
                hour: item.cita_dis_hora,
                reservationCode: item.cita_id
            });
        }
    });

    const handleTargetDateFromChild = (target) =>{
        setTargetDate(target);
    }

    useEffect(() => {

    }, [targetDate])

    return (
        <>
            <header>
                <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full'></img>
                </div>
            </header>
            <div className='p-16 bg-gradient-to-r from-blue-800 from-40% to-blue-500'>
                <h1 className="text-white-50 text-5xl font-black text-center">Agenda tu hora</h1>
            </div>
            <div className="flex flex-row px-4 pb-16 pt-6">
                <div className="w-[70%] pr-24 gap-y-12 flex flex-col">
                    {Object.values(professionalsData).map(professional => (
                        <HoursByProfessional professional={professional}/>
                    ))}
                </div>
                <div className="w-[30%] flex flex-col">
                    <Calendar hoursAvailable={hoursAvailable} firstHourAvailable={firstHourAvailable} inputTargetDate={targetDate} handleTargetDateFromChild={handleTargetDateFromChild}/>
                </div>
            </div>
            
        </>
    );
}
