import React, { useState } from "react";
import logoClinica from "../assets/img/logoClinica.png";
import PasswordInput from "../components/passwordInput";
import { ClipLoader } from 'react-spinners';
import { PiSignInBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';




export const Login = () => {

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        rutOrEmail: '',
        password: '',
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
                const response = await fetch('http://localhost:3090/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });
    
                if(response.ok){
                    const responseData = await response.json();
                    const { user, errors } = responseData;
                
                    if (errors) {
                        setErrors(errors);
                    } else if (user && Object.keys(user).length > 0) {
                        navigate('/home-login', { state: { infoUser: user} });
                    }
                }
            } catch (error){
                console.error('Error en la solicitud:', error);
            }
        }
        
        setIsLoading(false);
    }

    return(
        <>
            <header  className="flex flex-col w-[100%] max-2xl:px-28 max-lg:px-8 px-24"> 
                <div className="flex flex-row items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full'></img>
                </div>
            </header>
            <div className="flex flex-col w-[40%] m-auto py-24 max-md:w-[75%]">
                <form onSubmit={handleSubmit} className="bg-white-50 px-4 py-4 gap-y-8 flex flex-col rounded-lg shadow-gray-900 shadow-3xl">
                    <div className="gap-y-1 flex flex-col relative">
                        <label htmlFor="paRutOrEmail" className="text-gray-700">RUT o correo electrónico</label>
                        <input id="paRutEmail" name="rutOrEmail" value={formData.rutOrEmail} type="text" className="m-auto w-full border-border border-[0.5px] py-1 px-1.5 " placeholder="Ej: 20545267-1 o correo@dominio.cl" onChange={handleChange} />  
                        {errors.rutOrEmail && (
                            <p className="absolute top-full left-0 text-red-500 text-sm">{errors.rutOrEmail}</p>
                        )}
                    </div>
                    <div className="gap-y-1 flex flex-col relative">
                        <label htmlFor="password" className="text-gray-700">Contraseña</label>
                        <PasswordInput id='password' name='password' onChange={handleChange}/>
                        {errors.password && (
                            <p className="absolute top-full left-0 text-red-500 text-sm">{errors.password}</p>
                        )}
                    </div>
                    <div className="text-end flex w-[100%] rounded-md mt-16 col-span-2 items-end justify-center">
                        <button type="submit" className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-3 px-3 flex flex-row items-center gap-x-2 font-bold">{isLoading ? (<ClipLoader color="#FFFFFF" size={24}/>): (<PiSignInBold className="text-xl"/>)} INICIAR SESIÓN </button>
                    </div>
                </form>
            </div>
        </>
    );
}