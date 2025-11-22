import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PuntuacionEstrellas from './PuntuacionEstrellas'; 


function TarjetaJuego({ juego, onEliminar }) {

    const navigate = useNavigate();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleVerDetalle = () => {
        navigate(`/juego/${juego._id}`);
     
    };

    
    const toggleMenu = (e) => {
        e.stopPropagation();
         setMenuAbierto(prev => !prev);
     };

    const handleEditar = (e) => {
          e.stopPropagation();
        setMenuAbierto(false);
         navigate(`/editar/${juego._id}`);

    };

    const handleEliminar = (e) => {
        e.stopPropagation();
        setMenuAbierto(false);
        if (window.confirm(`¿Estás seguro de eliminar "${juego.titulo}"?`)) { 
            onEliminar(juego._id);
         }
    };



    const puntuacionNumerica = parseFloat(juego.puntuacion) || 0;



    return (
        <div className="tarjeta-juego">
            
            <div onClick={handleVerDetalle}> 
                <div className="tarjeta-imagen-contenedor">
                    <img 
                        src={juego.imagenPortada || 'https://via.placeholder.com/300x400/1e1e1e/a0a0a0?text=SIN+IMAGEN'} 
                        alt={juego.titulo} 
                        className="tarjeta-imagen" />

                </div>

                <div className="tarjeta-info">
                    <h3 className="tarjeta-titulo">{juego.titulo}</h3>
                    <PuntuacionEstrellas puntuacion={puntuacionNumerica} /> 
                </div>

            </div>

            <button className="btn-kebab" onClick={toggleMenu}>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </button>

            {menuAbierto && (
                <div className="menu-desplegable">
                <button onClick={handleEditar}>Editar</button> 
                    <button 
                        onClick={handleEliminar} 
                        className="btn-eliminar-menu"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default TarjetaJuego;
