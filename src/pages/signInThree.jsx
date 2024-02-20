import React, { useState, useEffect, useRef } from "react";
import logoClinica from "../assets/img/logoClinica.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

export const SignInThree = (props) => {
    const location = useLocation();
    const formData = location.state.formData;
    const passwordData = location.state.passwordData;
    const navigate = useNavigate();

    const [counter, setCounter] = useState(300); 
    const [inputValues, setInputValues] = useState(Array(6).fill(""));
    const [code, setCode] = useState(location.state.code);
    const [isMessageError, setIsMessageError] = useState(false);


    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

        return () => clearInterval(timer);
    }, [counter]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const inputsRef = useRef([]);

  const handleChange = (index, event) => {
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index] = value.toUpperCase();
    setInputValues(newInputValues);

    if (value === "") {
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
          inputsRef.current[prevIndex].focus();
        }
    } else {
        const nextIndex = index + 1;
        if (nextIndex < inputsRef.current.length) {
            inputsRef.current[nextIndex].focus();
        }
    }
  };

  const handleSubmit = async (e) => {
    let concatenatedCode = inputValues.join("");
    const combinedData = { ...formData, ...passwordData };
    e.preventDefault();
    if(concatenatedCode === code && counter > 0){
        setIsMessageError(false);
        try {
            const response = await fetch('/api/register-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            });
      
            if (response.ok) {
                console.log('Se registro exitosamente rey');
                navigate('/sign-in-final');
            } else {
                console.log('Error al registrar el usuario', response);
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
        }
    } else{
        setIsMessageError(true);
    }
  }

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
  
        if (response.ok) {
            const responseData = await response.json();
            setCode(responseData.code)
            setCounter(300);
        } else {
            console.error('Error al enviar el correo electrónico', response);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
    };
    return (
        <div className="bg-white-100 h-screen px-24">
            <header className="flex flex-col w-[100%] max-2xl:px-28 max-lg:px-8 px-24"> 
                <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                    <img src={logoClinica} className='w-60 h-full' alt="Logo Clínica"></img>
                </div>
                <div className="bg-blue-500">
                    <h1>{code}</h1>
                </div>
            </header>
            <section className="mt-16 w-[100%] flex flex-col gap-y-4 px-24">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">CREE UNA CUENTA NUEVA</h1>
                    <h3 className="text-base text-gray-600">INGRESE SUS DATOS</h3>
                </div>
                <div className="flex flex-col p-4 p gap-x-6 gap-y-4 bg-white-50 w-[100%] rounded-2xl">
                    <h1 className="text-center text-xl font-bold">Enviamos un mail de confirmación a su correo electrónico</h1>
                    <div className="flex flex-col text-gray-950">
                        <p className="text-center text-xl font-semibold">Tiempo restante</p>
                        <p className="text-center text-lg font-semibold">{formatTime(counter)}</p>
                    </div>
                    <div className="text-7xl justify-center flex text-blue-500">
                        <HiOutlineMailOpen/>
                    </div>
                    {counter === 0 ? (
                        <h3 className="text-center text-red-700 flex flex-row gap-x-2 items-center justify-center text-base"><IoIosWarning className="text-2xl"/> El código de confirmación ha expirado</h3>
                    ) : (
                        <h3 className="text-center">Código de confirmación</h3>
                    )}
                    <div className="flex flex-row gap-x-2 justify-center">
                        {[...Array(6)].map((_, index) => (
                            <input
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                key={index}
                                maxLength="1"
                                className="w-12 h-12 border-[1px] border-gray-400 text-center text-xl bg-gray-50"
                                onChange={(e) => handleChange(index, e)}
                                onInput={(e) => {
                                    e.target.value = e.target.value.toUpperCase();
                                }}
                                disabled={counter === 0}
                            />
                        ))}
                    </div>
                    {isMessageError && (
                        <h3 className="text-center text-red-700 flex flex-row gap-x-1 items-center justify-center"><RxCross2 className="text-2xl"/> El código de verificación no es válido</h3>
                    )}
                    <div className="flex w-[100%] items-center mt-2 justify-center">
                        {counter > 0 ? (
                            <button onClick={handleSubmit} className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-4 flex flex-row items-center gap-x-1 w-auto font-bold"><FaCheck/> CONFIRMAR REGISTRO</button>
                        ) : (
                            <button onClick={handleSubmitEmail} className="text-white-50 rounded-md bg-blue-600 hover:bg-blue-700 p-1.5 px-4 flex flex-row items-center gap-x-1 w-auto font-bold"><FaCheck/> REENVIAR CODIGO</button>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
