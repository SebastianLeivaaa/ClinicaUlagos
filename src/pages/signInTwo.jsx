import React, { useState } from "react";
import logoClinica from "../assets/img/logoClinica.png";
import { useLocation} from "react-router-dom";
import { FaCheckCircle, FaCheck } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PasswordInput from "../components/passwordInput";
import { ClipLoader } from 'react-spinners';



export const SignInTwo = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData  = location.state.formData;
    const validationPasswordOne = /^.{8,}$/;
    const validationPasswordTwo = /[A-Z]/;
    const validationPasswordThree = /[a-z]/;
    const validationPasswordFour = /[0-9]/;
    const validationPasswordGeneral = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3090/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
      
            if (response.ok) {
                const responseData = await response.json();
                const { code, info } = responseData;
                if(info.accepted.length > 0){
                    navigate('/sign-in-three', { state:{ formData: formData, passwordData: passwordData, code: code} });
                }
            } else {
                console.error('Error al enviar el correo electrónico', response);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
        setIsLoading(false);
    };

    return (
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
                        <div class="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 p-2"> 
                            <span class="text-white-50 font-bold text-base">2</span> 
                        </div>
                        <p className="text-white-50 font-bold">Crear clave</p>
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
                <form onSubmit={handleSubmit} className="grid grid-cols-2 p-4 p gap-x-6 gap-y-4 bg-white-50 w-[100%] rounded-2xl">
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="password">Contraseña</label>
                        <PasswordInput id='password' name='password' onChange={handleChange}/>
                    </div>
                    <div className="gap-y-1 flex flex-col">
                        <label htmlFor="confirmPassword">Confirme contraseña</label>
                        <PasswordInput id='confirmPassword' name='confirmPassword' onChange={handleChange}/>
                    </div>
                    <div className="col-span-2 w-[100%] flex flex-col">
                        <ul className="flex flex-col gap-y-2">
                            <li className="flex flex-row gap-x-2 items-end text-xl"><FaCheckCircle className={`h-full ${validationPasswordOne.test(passwordData.password) ? 'text-green-600' : 'text-gray-800'}`}/> <p className="text-base">Debe tener al menos 8 caracteres.</p></li>
                            <li className="flex flex-row gap-x-2 items-end text-xl"><FaCheckCircle className={`h-full ${validationPasswordTwo.test(passwordData.password) ? 'text-green-600' : 'text-gray-800'}`}/> <p className="text-base">Debe contener al menos una letra mayúscula.</p></li>
                            <li className="flex flex-row gap-x-2 items-end text-xl"><FaCheckCircle className={`h-full ${validationPasswordThree.test(passwordData.password) ? 'text-green-600' : 'text-gray-800'}`}/> <p className="text-base">Debe contener al menos una letra minúscula.</p></li>
                            <li className="flex flex-row gap-x-2 items-end text-xl"><FaCheckCircle className={`h-full ${validationPasswordFour.test(passwordData.password) ? 'text-green-600' : 'text-gray-800'}`}/> <p className="text-base">Debe contener al menos un número.</p></li>
                        </ul>
                    </div>
                    <div className="text-end flex w-[100%] mt-16 col-span-2 items-end justify-end">
                        {validationPasswordGeneral.test(passwordData.password) && passwordData.password === passwordData.confirmPassword ? (
                            <button  onClick={handleSubmit} className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-3 flex flex-row items-center gap-x-1 font-bold">{isLoading ? (<ClipLoader color="#FFFFFF" size={24}/>): (<FaCheck/>)} CREAR CONTRASEÑA</button>
                        ) : (
                            <button className="text-white-50 rounded-md bg-gray-300 p-1.5 px-3  flex flex-row items-center gap-x-1 font-bold" disabled><FaCheck/> CREAR CONTRASEÑA</button>
                        )}
                    </div>
                </form>
            </section>
        </div>
    );
};
