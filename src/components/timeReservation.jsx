import React, { useState, useEffect } from 'react';
import { capitalize } from '../utils/capitalize.js';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export const TimeReservation = () => {
    const [specialties, setSpecialties] = useState([]);
    const [professionals, setProfessionals] = useState([]);
    const [specialtiesActive, setSpecialtiesActive] = useState(false);
    const [professionalsActive, setProfessionalsActive] = useState(false);
    const [specialtyPick, setSpecialtyPick] = useState(false);
    const [formData, setFormData] = useState({
        specialty: '',
        codSpecialty: '',
        professional: '',
        rutProfessional: '',
        nameProfessional: '',
        lastNamePatProfessional: '',
        lastNameMatProfessional: '',
    })
    const navigate = useNavigate();

    const [searchTermSpecialty, setSearchTermSpecialty] = useState('');
    const [searchTermProfessional, setSearchTermProfessional] = useState('');

    const filteredProfessional = professionals.filter(professional => {
        const searchTermParts = searchTermProfessional.toLowerCase().split(" ");
        const fullName = `${professional.prof_nombres.toLowerCase()} ${professional.prof_apellido_pat.toLowerCase()} ${professional.prof_apellido_mat.toLowerCase()}`;
    
        // Verificar si la primera palabra ingresada está incluida en el nombre completo
        const firstTerm = searchTermParts[0];
        const restOfTerms = searchTermParts.slice(1);
    
        // Verificar si la primera palabra está incluida y si las demás coinciden exactamente en orden
        return fullName.includes(firstTerm) && restOfTerms.every((term, index) => {
            const nextIndex = fullName.indexOf(term, fullName.indexOf(searchTermParts[index]) + 1);
            return nextIndex !== -1;
        });
    });
    
    

    const [filteredProfessionalBySpecialty, setFilteredProfessionalBySpecialty] = useState([]);

    
    const handleChangeSpecialty = (e) => {
        const { name, value } = e.target;
        setSpecialtyPick(false);
        setFormData({
            ...formData,
            specialty: value,
            professional: '',
            rutProfessional: '',
            codSpecialty: '',
        });
        setSearchTermProfessional(''),
        setSearchTermSpecialty(value);
        setSpecialtiesActive(true);
    };

    const handleChangeProfessional = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            professional: value,
        });
        setSearchTermProfessional(value);
        setProfessionalsActive(true);
    };

    const filteredProfessionalBySpecialtyFinal = filteredProfessionalBySpecialty.filter(professional => {
        const searchTermParts = searchTermProfessional.toLowerCase().split(" ");
        const fullName = `${professional.prof_nombres.toLowerCase()} ${professional.prof_apellido_pat.toLowerCase()} ${professional.prof_apellido_mat.toLowerCase()}`;
    
        // Verificar si la primera palabra ingresada está incluida en el nombre completo
        const firstTerm = searchTermParts[0];
        const restOfTerms = searchTermParts.slice(1);
    
        // Verificar si la primera palabra está incluida y si las demás coinciden exactamente en orden
        return fullName.includes(firstTerm) && restOfTerms.every((term, index) => {
            const nextIndex = fullName.indexOf(term, fullName.indexOf(searchTermParts[index]) + 1);
            return nextIndex !== -1;
        });
    });

    const handleSpecialtyClick = (specialty) => {
        setSpecialtyPick(true);
        setFormData({
            ...formData,
            specialty: capitalize(specialty.espe_nombre),
            codSpecialty: specialty.espe_codigo,
            professional: '',
            rutProfessional: ''
        });
        setFilteredProfessionalBySpecialty(filteredProfessional.filter(professional => professional.prof_esp_codigo == specialty.espe_codigo))
        setSearchTermSpecialty('');
        setSpecialtiesActive(false);
        setProfessionalsActive(false);
        console.log(filteredProfessionalBySpecialty);
    }

    const handleProfessionalClick = (professional) => {
        setFormData({
            ...formData,
            professional: capitalize(`${professional.prof_nombres} ${professional.prof_apellido_pat} ${professional.prof_apellido_mat}`),
            rutProfessional: professional.prof_rut,
            specialty: capitalize(professional.espe_nombre)
        });
        setProfessionalsActive(false);
    }

    const filteredSpecialties = specialties.filter(specialty =>
        specialty.espe_nombre.toLowerCase().includes(searchTermSpecialty.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(formData.professional !== '' || formData.specialty !== ''){
                const response = await fetch('http://localhost:3090/api/get-medicals-hours', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })

                if(response.ok){
                    const responseData = await response.json();
                    navigate('/time-reservation-two', { state: {medicalHoursData: responseData}});
                }
            }
        } catch(error){
            console.error('Error:', error);
        }
    }

 
    useEffect(() => {
        fetch('http://localhost:3090/api/get-specialties-professionals')
          .then(response => response.json())
          .then(data => {setSpecialties(data.resultSpecialties); setProfessionals(data.resultProfessional)})
          .catch(error => console.error('Error al obtener las especialidades:', error));
    }, []);

    return(
        <div className="w-[100%] px-4 pt-4 pb-16 flex flex-col text-white-50 gap-y-8">
            <h1 className="font-black text-3xl">RESERVA TU HORA</h1>
            <form onSubmit={handleSubmit} className="flex flex-row gap-x-16 text-lg w-full">
                <div className="flex flex-col w-[30%] gap-y-1 relative">
                    <label htmlFor="specialty">Especialidad</label>
                    <div className="bg-white-50 text-gray-600 px-2 py-2 flex items-center gap-x-2 justify-between">
                        <input type="text" id="specialty" name="specialty" value={formData.specialty} placeholder="Buscar" onChange={handleChangeSpecialty} className="focus:outline-none text-ellipsis"/>
                        <button type="button" onClick={() => setSpecialtiesActive(!specialtiesActive)}>
                            {specialtiesActive ? (<IoIosArrowUp/>) : (<IoIosArrowDown/>)}
                        </button>
                    </div>
                    {specialtiesActive && (
                        <div className="absolute top-full left-0 w-full bg-white-50 text-gray-600 border border-gray-300 max-h-48 overflow-scroll overflow-x-hidden">
                            {filteredSpecialties.length === 0 ? (
                                <button className="px-4 py-2 hover:bg-gray-100 w-full text-start" disabled>Sin resultados</button>
                            ) : (
                                filteredSpecialties.map((specialty, index) => (
                                    <button type="button" onClick={() => handleSpecialtyClick(specialty)} key={specialty.espe_codigo} className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-start">
                                        {capitalize(specialty.espe_nombre)}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <div className="flex flex-col w-[30%] gap-y-1 relative">
                    <label htmlFor="professional">Profesional</label>
                    <div className="bg-white-50 text-gray-600 px-2 py-2 flex items-center gap-x-2 justify-between">
                        <input type="text" id="professional" name="professional" value={formData.professional} placeholder="Buscar" onChange={handleChangeProfessional} className="focus:outline-none text-ellipsis"/>
                        <button type="button" onClick={() => setProfessionalsActive(!professionalsActive)}>
                            {professionalsActive ? (<IoIosArrowUp/>) : (<IoIosArrowDown/>)}
                        </button>
                    </div>
                    {professionalsActive && (
                        <div className="absolute top-full left-0 w-full bg-white-50 text-gray-600 border border-gray-300 max-h-48 overflow-scroll overflow-x-hidden ">
                            {filteredProfessional.length === 0 && filteredProfessionalBySpecialty.length === 0 ? (
                                <button className="px-4 py-2 hover:bg-gray-100 w-full text-start" disabled>Sin resultados</button>
                            ) : (
                                    (specialtyPick ? filteredProfessionalBySpecialtyFinal : filteredProfessional).map((professional, index) => (
                                        <button type="button" onClick={() => handleProfessionalClick(professional)} key={professional.prof_rut} className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-start">
                                            {capitalize(`${professional.prof_nombres} ${professional.prof_apellido_pat} ${professional.prof_apellido_mat}`)}
                                        </button>
                                    ))
                            )}
                        </div>
                    )}
                </div>
                <div className='mt-auto w-full flex pt-6'>
                    <button type='submit' className='flex flex-row gap-x-2 items-center bg-orange-600 text-white text-lg rounded-3xl py-4 px-10 font-bold'><FaClock/> Agendar hora</button>
                </div>
            </form>
        </div>
    )
}