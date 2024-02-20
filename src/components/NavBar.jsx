import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Login } from '../pages/login';
import logoClinica from "../assets/img/logoClinica.png";

export const NavBar = () => {
    const [onToggleMenu, setOnToggleMenu] = useState(false);

    return(
        <>
                <header className="w-[100%] mr-[20%] z-20 max-2xl:w-[100%] max-2xl:px-4 max-2xl:mr-[0%]">
                    <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-between w-[100%] max-md:py-2">
                        <img src={logoClinica} className='w-60 h-full'></img>
                        <div className='gap-x-6 flex'>
                            <Link to="login"><button>Iniciar sesión</button></Link>
                            <Link to="sign-in"><button>Registrarse</button></Link>
                        </div>
                    </div>
                    <div className="flex flex-row align-items-center items-end py-5 gap-x-10 justify-center w-[100%] max-md:py-2">
                        <nav className={`max-lg:absolute max-lg:top-[100%] max-lg:bg-snowy-mint-100 max-lg:w-[100%] max-lg:py-6 duration-500 transition ${onToggleMenu ? "max-lg:visible max-lg:pr-5" : "max-lg:hidden"}`}>
                            <ul className={`flex flex-row gap-x-10 text-lg max-lg:flex-col max-lg:items-center max-lg:gap-y-3`}>
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
