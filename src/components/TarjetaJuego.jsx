import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { eliminarJuego } from '../api/juegosAPI';


const TarjetaJuego = ({ juego, onJuegoEliminado }) => {
    
    
    const { _id, titulo, desarrollador, genero, imagenPortada, completado } = juego;
    const navigate = useNavigate();

    
    const handleEliminar = async () => {
      if (window.confirm(`¿Estás seguro de que quieres eliminar el juego "${titulo}"?`)) {
             try {
                await eliminarJuego(_id);

                  onJuegoEliminado(); 

            } catch (error) {
                console.error("Error al eliminar el juego:", error);
                 alert("Hubo un error al eliminar el juego.");
            }
        }
    };
    

    const handleEditar = () => {
        
        navigate(`/editar/${_id}`); 
    };

    return (
           <div className="tarjeta-juego">

            <img 
                src={imagenPortada || 'placeholder.jpg'} 
                alt={`Portada de ${titulo}`} 
                className="tarjeta-imagen"   />

            <div className="tarjeta-info">

            <h3 className="tarjeta-titulo">{titulo || "Título del Juego"}</h3>
                 <p className="tarjeta-desarrollador">Desarrollador: {desarrollador}</p>
                <p className="tarjeta-genero">Género: {genero || "Acción/RPG"}</p>

                <div className= {`tarjeta-estado ${completado ? 'completo' : 'pendiente'}`}>
                    {completado ? '✅ COMPLETADO' : '⏳ PENDIENTE'}
                </div>
            
            </div>
            
            <div className="tarjeta-acciones">
                
                
                <button className="btn-editar" onClick={handleEditar}> ✏️ Editar </button>
                
                <button className="btn-eliminar" onClick={handleEliminar}> 🗑️ Eliminar </button>
            
            </div>

        </div>
    );
}

export default TarjetaJuego;