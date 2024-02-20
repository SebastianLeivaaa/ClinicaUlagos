import React, { useState } from "react";
import logoClinica from "../assets/img/logoClinica.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";


export const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        lastNamePat: '',
        lastNameMat: '',
        rut: '',
        dateBirth: '',
        email: '',
        gender: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        navigate('/sign-in-two', { state:{ formData: formData} });
    }
    return(
        <div className="bg-white-100 h-screen px-24">
            <header  className="flex flex-col w-[100%] max-2xl:px-28 max-lg:px-8"> 
                <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full'></img>
                </div>
                <div className="bg-blue-500">
                    <h1>hola</h1>
                </div>
            </header>
            <section className="mt-16 w-[100%] flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">CREE UNA CUENTA NUEVA</h1>
                    <h3 className="text-base text-gray-600">INGRESE SUS DATOS</h3>
                </div>
                <form className="grid grid-cols-2 p-4 p gap-x-6 gap-y-4 bg-white-50 w-[100%] rounded-2xl">
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paName">Nombre</label>
                        <input id="paName" name="name" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu nombre" onChange={handleChange} required  />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paLName">Apellido Paterno</label>
                        <input id="paLName" name="lastNamePat" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu apellido paterno" onChange={handleChange} required />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paLName">Apellido Materno</label>
                        <input id="paLName" name="lastNameMat" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ingresa tu apellido materno" onChange={handleChange} required />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paRut">Rut</label>
                        <input id="paRut" name="rut" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej: 20545267-1" onChange={handleChange} required />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="DoB">Fecha de nacimiento</label>
                        <input id="DoB" name="dateBirth" type="date" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" onChange={handleChange} required />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paEmail">Correo Electronico</label>
                        <input id="paEmail" name="email" type="email" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="correo@dominio.cl" onChange={handleChange} required />
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paGender">Género (opcional)</label>
                        <select id="paGender" name="gender" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" onChange={handleChange}>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                            <option value="0">Otro</option>
                        </select>
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="paPhone">Teléfono</label>
                        <input id="paPhone" name="phone" type="tel" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej:958472045" onChange={handleChange} required />
                    </div>
                    <div className="text-center object-cover w-[25%] m-auto rounded-md mt-16 col-span-2 items-center">
                        <button onClick={handleSubmit} className="text-white-50 rounded-md p-1.5 bg-blue-600 hover:bg-blue-700 w-full m-auto flex flex-row gap-x-1 items-center justify-center font-bold"><MdKeyboardArrowRight className="text-2xl"/> CREE SU CONTRASEÑA </button>
                    </div>
                </form>
            </section>
        </div>
    );
}