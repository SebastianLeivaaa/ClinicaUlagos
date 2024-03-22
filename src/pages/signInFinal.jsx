import React from "react";
import logoClinica from "../assets/img/logoClinica.png";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';




export const SignInFinal = () => {
    const navigate = useNavigate();

    return(
        <div className="bg-white-100 h-screen px-24">
            <header className="flex flex-col w-[100%] max-2xl:px-28 max-lg:px-8 px-24"> 
                <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full' alt="Logo Clínica"></img>
                </div>
                <div className="bg-blue-700 flex flex-row items-center w-[100%] max-md:w-[100%] p-6 justify-center m-auto gap-x-2">
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 p-2 opacity-80"> 
                            <span class="text-blue-900 font-bold text-base"><FaCheck/></span> 
                        </div>                         
                        <p className="text-white-50 font-bold">Completar datos</p>
                    </div>
                    <div className="h-0.5 grow shrink flex basis-auto bg-white-50">
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 p-2 opacity-80"> 
                            <span class="text-blue-900 font-bold text-base"><FaCheck/></span> 
                        </div>
                        <p className="text-white-50 font-bold">Crear clave</p>
                    </div>
                    <div className="h-0.5 grow shrink flex basis-auto bg-white-50">
                    </div>
                    <div className="flex flex-row items-center gap-x-1.5">
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 p-2 opacity-80"> 
                            <span class="text-blue-900 font-bold text-base"><FaCheck/></span> 
                        </div>
                        <p className="text-white-50 font-bold">Confirme cuenta</p>
                    </div>
                </div>
            </header>
            <section className="mt-16 w-[100%] flex flex-col gap-y-8 px-24">
                <div className="flex flex-col gap-y-8 items-center">
                    <h1 className="text-2xl font-bold text-gray-900 ">¡TE HAS REGISTRADO EXITOSAMENTE!</h1>
                    <FaCheckCircle className="text-[200px] text-blue-500"/>
                    <button onClick={() => {navigate('/');}} className="text-white-50 mt-4 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-6 flex flex-row items-center gap-x-1 w-auto font-bold"><IoHome className="text-xl"/> VOLVER AL INICIO</button>
                </div>
            </section>
        </div>
    );
}