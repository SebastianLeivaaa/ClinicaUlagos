import React, { useState } from "react";
import { validateRut, validateDate, validateFormatPhone, validateEmailFormat } from "../utils/validationRegister.js";
import { ClipLoader } from 'react-spinners';
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




export const FormConfirmHourByGuest = ( { reservationCode, infoReservation} ) => {
    const [formData, setFormData] = useState({
        name: '',
        lastNamePat: '',
        lastNameMat: '',
        rut: '',
        dateBirth: '',
        email: '',
        gender: '',
        phone: '',
        reservationCode: reservationCode,
        nameProf: infoReservation.nameProf,
        lastNamePatProf: infoReservation.lastNamePatProf,
        lastNameMatProf: infoReservation.lastNameMatProf,
        hourReservation: infoReservation.hour,
        dateReservation: infoReservation.date,
        specialtyReservation: infoReservation.specialty,
        imgProf: infoReservation.imgProf
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
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
        if(formData.name.trim() === ''){
            newErrors.name = 'Por favor ingrese su nombre.';
        }
        if(formData.lastNamePat.trim() === ''){
            newErrors.lastNamePat = 'Por favor ingrese su apellido paterno.';
        }
        if(formData.lastNameMat.trim() === ''){
            newErrors.lastNameMat = 'Por favor ingrese su apellido materno.';
        }
        if(!validateRut(formData.rut)){
            newErrors.rut = 'Ingrese un rut válido';
        }
        if(!validateDate(formData.dateBirth)){
            newErrors.dateBirth = 'Ingrese una fecha de nacimiento válida';
        }
        if(!validateFormatPhone(formData.phone)){
            newErrors.phone = 'Ingrese un formato de telefono válido';
        }
        if(!validateEmailFormat(formData.email)){
            newErrors.email = 'Ingrese un correo electrónico válido'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try{
                const response = await fetch('http://localhost:3090/api/confirm-reservation-by-guess', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });



                if(response.ok){
                    const responseData = await response.json();
                    const { info } = responseData;
                    if(info.accepted.length > 0){
                        navigate('/time-reservation-final', { state:{ infoReservation: formData} });
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
                <label htmlFor="paRut">Rut</label>
                <input id="paRut" name="rut" value={formData.rut} maxLength="10" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej: 20545267-1" onChange={handleChange} />
                {errors.rut && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.rut}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paName">Nombre(s)</label>
                <input id="paName" name="name" type="text" value={formData.name} className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu nombre" onChange={handleChange} />
                {errors.name && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.name}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paLName">Apellido Paterno</label>
                <input id="paLName" name="lastNamePat" value={formData.lastNamePat} type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu apellido paterno" onChange={handleChange} />
                {errors.lastNamePat && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.lastNamePat}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paLName">Apellido Materno</label>
                <input id="paLName" name="lastNameMat" value={formData.lastNameMat} type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu apellido materno" onChange={handleChange} />
                {errors.lastNameMat && (
                        <p className="absolute top-full left-0 text-red-500 text-sm">{errors.lastNameMat}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="DoB">Fecha de nacimiento</label>
                <input id="DoB" name="dateBirth" value={formData.dateBirth} type="date" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" onChange={handleChange} />
                {errors.dateBirth && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.dateBirth}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paEmail">Correo Electronico</label>
                <input id="paEmail" name="email" value={formData.email} type="email" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="correo@dominio.cl" onChange={handleChange} />
                {errors.email && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.email}</p>
                )}
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paGender">Género (opcional)</label>
                <select id="paGender" name="gender" value={formData.gender} className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" onChange={handleChange}>
                    <option value={null}>Selecciona un género</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                    <option value="0">Otro</option>
                </select>
            </div>
            <div className="gap-y-1 flex flex-col relative">
                <label htmlFor="paPhone">Teléfono</label>
                <input id="paPhone" name="phone" value={formData.phone} maxLength="9" type="tel" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej:958472045" onChange={handleChange} />
                {errors.phone && (
                    <p className="absolute top-full left-0 text-red-500 text-sm">{errors.phone}</p>
                )}
            </div>
            <div className="text-end flex w-[100%] rounded-md mt-16 col-span-2 items-end justify-end">
                <button type="submit" className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-3 flex flex-row items-center gap-x-2 font-bold">{isLoading ? (<ClipLoader color="#FFFFFF" size={24}/>): (<FaCheck className="text-base"/>)} CONFIRMAR RESERVA </button>
            </div>
        </form>
    );
}
