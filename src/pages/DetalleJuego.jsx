import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PuntuacionEstrellas from '../components/PuntuacionEstrellas';
import { obtenerJuegoPorId } from '../api/juegosAPI';

function DetalleJuego() {
    
    
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDetalle = async () => {
            try {
                
                const datosJuego = await obtenerJuegoPorId(id); 
                setJuego(datosJuego);
            } catch (error) {
                console.error("Error al cargar detalle del juego:", error);
                setJuego(null); 
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            cargarDetalle();
        }
    }, [id]);

    if (cargando) {
        return <div className="detalle-container"><p>Cargando información del juego</p></div>;
    }

    if (!juego) {
        return <div className="detalle-container"><p>Juego no encontrado.</p></div>;
    }

    
    const estadoClase = juego.completado ? 'completo' : 'pendiente'; 
    const estadoTexto = juego.completado ? 'COMPLETADO' : 'PENDIENTE'; 
  const puntuacion = juego.puntuacion ? parseFloat(juego.puntuacion) : 0;
    
    return (
        <div className="detalle-container">
            
            <h1 className="detalle-titulo">{juego.titulo}</h1>
            
            <div className="detalle-grid">
                
                
                <div className="detalle-imagen-wrapper">
                    <img 
                       
                        src={juego.imagenPortada || 'https://via.placeholder.com/300x400/1e1e1e/a0a0a0?text=SIN+IMAGEN'} 
                        alt={`Carátula de ${juego.titulo}`} 
                        className="detalle-imagen" />
                </div>

                
                <div className="detalle-info-wrapper">
                    
                    
                    <div className="detalle-estado-puntuacion">
                        
                        <div className={`detalle-estado ${estadoClase}`}>
                            {estadoTexto}
                        </div>
                        
                        <div className="detalle-puntuacion">
                            <PuntuacionEstrellas puntuacion={puntuacion} />
                        </div>
                    
                    </div>
                    
                    
                    <p className="detalle-dato">
                        <span className="detalle-label">Desarrollador:</span> {juego.desarrollador}
                    </p>
                    <p className="detalle-dato">
                        <span className="detalle-label">Género:</span> {juego.genero}
                    </p>
                     <p className="detalle-dato">
                        <span className="detalle-label">Año de Lanzamiento:</span> {juego.lanzamiento || 'N/A'}
                    </p>
                     <p className="detalle-dato">
                         <span className="detalle-label">Horas Jugadas:</span> {juego.horasJugadas || '0'}
                    </p>
                    
                    <hr className="detalle-separator" />
                    
                </div>
            </div>
        </div>
    );
}

export default DetalleJuego;