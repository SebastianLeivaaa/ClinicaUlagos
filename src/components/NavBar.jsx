import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import logoClinica from "../assets/img/logoClinica.png";
import { IoPerson } from "react-icons/io5";
import { FaSignInAlt } from "react-icons/fa";

export const NavBar = () => {
    const [onToggleMenu, setOnToggleMenu] = useState(false);

    return(
        <>
                <header className="w-[100%] mr-[20%] z-20 max-2xl:w-[100%] max-2xl:px-4 max-2xl:mr-[0%]">
                    <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                        <img src={logoClinica} className='w-60 h-full'></img>
                        <div className='gap-x-6 flex'>
                            <Link to="login"><button className='bg-white-50 py-2 px-4 text-blue-600 border-blue-600 border-[1px] rounded hover:bg-blue-600 hover:text-white-50 font-semibold flex flex-row gap-x-2 items-center'><IoPerson className="text-lg" /> Iniciar sesión</button></Link>
                            <Link to="sign-in"><button className='bg-white-50 py-2 px-4 text-blue-600 border-blue-600 border-[1px] rounded hover:bg-blue-600 hover:text-white-50 font-semibold flex flex-row gap-x-2 items-center'><FaSignInAlt className="text-lg" /> Registrarse</button></Link>
                        </div>
                    </div>
                    <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-center w-[100%] max-md:py-2">
                        <nav className={`max-lg:absolute max-lg:top-[100%] max-lg:bg-snowy-mint-100 max-lg:w-[100%] max-lg:py-6 duration-500 transition ${onToggleMenu ? "max-lg:visible max-lg:pr-5" : "max-lg:hidden"}`}>
                            <ul className={`flex flex-row gap-x-10 text-lg text-blue-950 max-lg:flex-col max-lg:items-center max-lg:gap-y-3`}>
                                <li>
                                    <a href="#home" className=""  onClick={() => setOnToggleMenu(false)}>
                                        Inicio
                                    </a>                            
                                </li>
                                <li>
                                    <a href="#specialties" className="" onClick={() => setOnToggleMenu(false)}>
                                        Especialidades
                                    </a>                            
                                </li>
                                <li>
                                    <a href="#professionals" className="" onClick={() => setOnToggleMenu(false)}>
                                        Profesionales
                                    </a>
                                </li>   
                                <li>
                                    <a href="#contact" className="" onClick={() => setOnToggleMenu(false)}>
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="h-full gap-x-2 flex flex-row">
                            <button className="lg:hidden max-lg:text-3xl" onClick={() => setOnToggleMenu(!onToggleMenu)}>
                                {onToggleMenu ? <RxCross2/> : <FaBars/>}                        
                            </button>
                        </div>
                    </div>
                </header>  
        </>
    );
}
