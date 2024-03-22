import React, { useState } from "react";
import { ClipLoader } from 'react-spinners';
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PasswordInput from "./passwordInput";


export const FormConfirmHourByUser = ( { reservationCode, infoReservation} ) => {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        rutOrEmail: '',
        password: '',
        reservationCode: reservationCode,
        nameProf: infoReservation.nameProf,
        lastNamePatProf: infoReservation.lastNamePatProf,
        lastNameMatProf: infoReservation.lastNameMatProf,
        hourReservation: infoReservation.hour,
        dateReservation: infoReservation.date,
        specialtyReservation: infoReservation.specialty,
        imgProf: infoReservation.imgProf
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const newErrors = {};
        
        if(formData.rutOrEmail.trim() === ''){
            newErrors.rutOrEmail = 'Por favor ingrese su rut o correo electrónico.';
        }
        if(formData.password.trim() === ''){
            newErrors.password = 'Por favor ingrese su clave.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try{
                const response = await fetch('http://localhost:3090/api/confirm-reservation-by-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });
    
                if(response.ok){
                    const responseData = await response.json();
                    const { info, errors } = responseData;
                
                    if (errors) {
                        setErrors(errors);
                    } else if (info && info.accepted && info.accepted.length > 0) {
                        navigate('/time-reservation-final', { state: { infoReservation: formData } });
                    }
                }
            } catch (error){
                console.error('Error en la solicitud:', error);
            }
        }
        
        setIsLoading(false);
    }

    return(
        <form onSubmit={handleSubmit} className="grid grid-cols-2 p-4 p gap-x-6 gap-y-8 bg-white-50 w-[100%] rounded-2xl max-md:flex max-md:flex-col">
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paRutOrEmail">RUT o correo electrónico</label>
                <input id="paRutEmail" name="rutOrEmail" value={formData.rutOrEmail} type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej: 20545267-1 o correo@dominio.cl" onChange={handleChange} />
                {errors.rutOrEmail && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.rutOrEmail}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="password">Contraseña</label>
                <PasswordInput id='password' name='password' onChange={handleChange}/>
                {errors.password && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.password}</p>
                )}
            </div>
            <div className="text-end flex w-[100%] rounded-md mt-16 col-span-2 items-end justify-end">
                <button type="submit" className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-3 flex flex-row items-center gap-x-2 font-bold">{isLoading ? (<ClipLoader color="#FFFFFF" size={24}/>): (<FaCheck className="text-base"/>)} CONFIRMAR RESERVA </button>
            </div>
        </form>
    );
}