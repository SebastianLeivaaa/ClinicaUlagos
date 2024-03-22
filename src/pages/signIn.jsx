import React, { useState } from "react";
import logoClinica from "../assets/img/logoClinica.png";
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { validateRut, validateDate, validateFormatPhone, validateEmailFormat } from "../utils/validationRegister.js";
import { ClipLoader } from 'react-spinners';


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

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);


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
                const response = await fetch('http://localhost:3090/api/query-user-exists', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });

                if(response.ok){
                    const responseData = await response.json();

                    if(responseData.infoRut.length > 0){
                        newErrors.rut = 'Este rut ya existe en nuestro sistema';
                    }
                    
                    if(responseData.infoEmail.length > 0){
                        newErrors.email = 'Este correo electrónico ya esta vinculado a una cuenta';
                    }

                    if(responseData.infoPhone.length > 0){
                        newErrors.phone = 'Este número telefónico ya esta vinculado a una cuenta';
                    }

                    if (Object.keys(newErrors).length > 0) {
                        setErrors(newErrors);
                    } else {
                        navigate('/sign-in-two', { state:{ formData: formData} });
                    }
                }
            } catch (error){
                console.error('Error en la solicitud:', error);
            }
        }
        setIsLoading(false);
    }
    return(
        <div className="bg-white-100 h-screen px-24">
            <header  className="flex flex-col w-[100%] max-2xl:px-28 max-lg:px-8 px-24"> 
                <div className="flex flex-row items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full'></img>
                </div>
                <div className="bg-blue-700 flex flex-row items-center w-[100%] max-md:w-[100%] p-6 justify-center m-auto gap-x-2">
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 p-2"> 
                            <span class="text-white-50 font-bold text-base">1</span> 
                        </div>                         
                        <p className="text-white-50 font-bold">Completar datos</p>
                    </div>
                    <div className="h-0.5 grow shrink flex basis-auto bg-white-50 opacity-50">
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 p-2"> 
                            <span class="text-white-50 font-bold text-base">2</span> 
                        </div>
                        <p className="text-white-50 opacity-50">Crear clave</p>
                    </div>
                    <div className="h-0.5 grow shrink flex basis-auto bg-white-50 opacity-50">
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-900 p-2"> 
                            <span class="text-white-50 font-bold text-base">3</span> 
                        </div>
                        <p className="text-white-50 opacity-50">Confirme cuenta</p>
                    </div>
                </div>
            </header>
            <section className="mt-16 w-[100%] flex flex-col gap-y-4 px-24">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">CREE UNA CUENTA NUEVA</h1>
                    <h3 className="text-base text-gray-600">INGRESE SUS DATOS</h3>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 p-4 p gap-x-6 gap-y-6 bg-white-50 w-[100%] rounded-2xl">
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
                        <label htmlFor="paRut">Rut</label>
                        <input id="paRut" name="rut" value={formData.rut} maxLength="10" type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5" placeholder="Ej: 20545267-1" onChange={handleChange} />
                        {errors.rut && (
                            <p className="absolute top-full left-0 text-red-500 text-sm">{errors.rut}</p>
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
                        <button type="submit" className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-3 flex flex-row items-center gap-x-1 font-bold">{isLoading ? (<ClipLoader color="#FFFFFF" size={24}/>): (<MdKeyboardArrowRight className="text-2xl"/>)} CREE SU CONTRASEÑA </button>
                    </div>
                </form>
            </section>
        </div>
    );
}