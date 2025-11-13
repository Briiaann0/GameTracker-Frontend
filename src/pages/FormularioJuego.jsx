import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { crearJuego, obtenerJuegoPorId, actualizarJuego } from '../api/juegosAPI'; 


function FormularioJuego() {

    const navigate = useNavigate();
    const { id } = useParams(); 
    
   
    const esEditar = !!id; 

    
    const [juego, setJuego] = useState({
        titulo: '',
        desarrollador: '',
        genero: '',
        añoLanzamiento: '',
        imagenPortada: '',
        completado: false
    });


    
    useEffect(() => {
        if (esEditar) {
            const cargarJuego = async () => {
                try {
                    const juegoEncontrado = await obtenerJuegoPorId(id);
                    setJuego({
                        ...juegoEncontrado,
                       
                        añoLanzamiento: String(juegoEncontrado.añoLanzamiento) 
                    });
                } catch (error) {
                    console.error("Error al cargar juego para edición:", error);
                   
                    navigate('/'); 
                }
            };
            cargarJuego();
        }
    }, [id, esEditar, navigate]); 


    const handleChange = (e) => {
        
        const { name, value, type, checked } = e.target;
        
        setJuego({
            ...juego,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            if (esEditar) {
                
                await actualizarJuego(id, juego); 
                console.log('Juego actualizado con éxito.');
            } else {
                
                await crearJuego(juego);
                console.log('Juego creado con éxito.');
            }
            
            
            navigate('/'); 

        } catch (error) {
            console.error("Error al guardar el juego:", error);
            alert(`No se pudo ${esEditar ? 'actualizar' : 'agregar'} el juego. Revisa los datos y que el Backend esté corriendo.`);
        }
    };
    
    return (
        <div className="formulario-container">
            
           
            <h2>{esEditar ? '🛠️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h2>
            
            <form className="juego-form" onSubmit={handleSubmit}>
                
               
                
                <div className="form-group">
                    <label htmlFor="titulo">Título del Juego:</label>
                    <input 
                        type="text" 
                        id="titulo" 
                        name="titulo" 
                        placeholder="Ej: The Legend of Zelda" 
                        required 
                        value={juego.titulo} 
                        onChange={handleChange} 
                    />
                </div>
                
                
                <div className="form-group">
                <label htmlFor="desarrollador">Desarrollador:</label>
                    <input 
                        type="text" 
                        id="desarrollador" 
                        name="desarrollador" 
                        placeholder="Ej: Nintendo" 
                        required 
                        value={juego.desarrollador}
                        onChange={handleChange}
                    />
                </div>
                
                
                <div className="form-group">
                    <label htmlFor="genero">Género Principal:</label>
                    <select 
                        id="genero" 
                        name="genero" 
                        required
                        value={juego.genero}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona un género</option>
                        <option value="RPG">RPG</option>
                        <option value="Accion">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Terror">Terror</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                
                
                <div className="form-group">
                <label htmlFor="añoLanzamiento">Año de Lanzamiento:</label>
                    <input 
                        type="number" 
                        id="añoLanzamiento" 
                        name="añoLanzamiento" 
                        placeholder="Ej: 2023" 
                        value={juego.añoLanzamiento}
                        onChange={handleChange}
                    />
                </div>
                
                
                <div className="form-group">
                    <label htmlFor="imagenPortada">URL Imagen de Portada:</label>
                    <input 
                        type="url" 
                        id="imagenPortada" 
                        name="imagenPortada" 
                        placeholder="https://ejemplo.com/portada.jpg" 
                        value={juego.imagenPortada}
                        onChange={handleChange}
                    />
                </div>

                
                <div className="form-group checkbox-group">
                    <input 
                        type="checkbox" 
                        id="completado" 
                        name="completado" 
                        checked={juego.completado} 
                        onChange={handleChange}
                    />

                    <label htmlFor="completado">Juego Completado</label>
                </div>

                
                <button type="submit" className="btn-submit">
                
                    {esEditar ? '💾 Guardar Cambios' : '➕ Agregar Juego a Biblioteca'}
                </button>
                
            </form>
        </div>
    );
}

export default FormularioJuego;