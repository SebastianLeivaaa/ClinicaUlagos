import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


export const HomeLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkSessionExpiration = async () => {
          // Verificar si la sesión ha expirado
          try {
            const response = await fetch('http://localhost:3090/api/check-session', {
              credentials: 'include',
 
            });
            const responseData = await response.json();
            const { active } = responseData;
            console.log(active);
            if (response.ok) {
              // Si la sesión es válida, no hacemos nada
                console.log(response.body);
            } else {
              // Si la sesión ha expirado, redirigimos al usuario a la página de inicio de sesión
              console.log(response);
              navigate('/');
            }
          } catch (error) {
            console.error('Error al verificar la expiración de la sesión:', error);
          }
        };
    
        // Verificar la expiración de la sesión cada 30 segundos (30000 milisegundos)
        const intervalId = setInterval(checkSessionExpiration, 5000);
    
        // Limpiar el temporizador cuando el componente se desmonta
        return () => clearInterval(intervalId);
      }, [navigate]);
    return(
        <div>
            HODSAJDOASJODIOASDIO
        </div>
    );
}
