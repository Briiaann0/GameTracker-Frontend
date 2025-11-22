import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerJuegoPorId, guardarJuego } from '../api/juegosAPI'; 

const initialState = {
    titulo: '',
    desarrollador: '',
    genero: '',
    lanzamiento: new Date().getFullYear().toString(),
    imagenPortada: '',
    horasJugadas: 0,
    puntuacion: 0,
    completado: false,
};

function FormularioJuego() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const [juego, setJuego] = useState(initialState);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    
    const esEdicion = !!id; 

    useEffect(() => {
       
        if (esEdicion) {
        setCargando(true);
            const cargarJuego = async () => {
                try {
                    const data = await obtenerJuegoPorId(id);
                    setJuego({
                        ...data,
                        imagenPortada: data.imagenPortada || '', 
                        lanzamiento: data.lanzamiento ? data.lanzamiento.toString() : '',
                        horasJugadas: data.horasJugadas ? data.horasJugadas.toString() : '0',
                        puntuacion: data.puntuacion ? data.puntuacion.toString() : '0',
                    });
                } catch (err) {
                    setError('Error al cargar los datos del juego.');
                    console.error('Error al cargar el juego:', err);
                } finally {
                    setCargando(false);
               
                }
            };
            cargarJuego();
        } else {
            setJuego(initialState);
       
        }
    }, [id, esEdicion]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJuego(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError(null);

        const juegoAEnviar = {
            ...juego,
            horasJugadas: parseInt(juego.horasJugadas, 10) || 0,
            puntuacion: parseInt(juego.puntuacion, 10) || 0,
            lanzamiento: parseInt(juego.lanzamiento, 10) || null,
            
        };
        
       

        try {
            await guardarJuego(juegoAEnviar, id); 
            navigate('/'); 
        } catch (err) {
            setError('Error al guardar el juego. Verifica los datos y la conexión.');
            console.error('Error al guardar el juego:', err);
        } finally {
            setCargando(false);
        }
    };

    if (cargando && esEdicion) {
        return <h2 style={{ textAlign: 'center', marginTop: '100px', color: '#a0a0a0' }}>Cargando datos...</h2>;
    }

    return (
        <div className="contenedor-principal">
            
            <h1 className="titulo-principal-formulario">
                {esEdicion ? `Editar: ${juego.titulo}` : 'Agregar'}
            </h1>

            <form onSubmit={handleSubmit} className="formulario-juego">
                
                {error && <p className="mensaje-error">{error}</p>}
                
                <div className="campo-formulario">
                    <label htmlFor="titulo">Título del Juego:</label>
                    <input type="text" id="titulo" name="titulo" value={juego.titulo} onChange={handleChange} required />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="desarrollador">Desarrollador:</label>
                    <input type="text" id="desarrollador" name="desarrollador" value={juego.desarrollador} onChange={handleChange} required />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="genero">Género Principal:</label>
                    <select id="genero" name="genero" value={juego.genero} onChange={handleChange} required>
                        <option value="">Selecciona un género</option>
                        <option value="RPG">RPG</option>
                        <option value="Accion">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Terror">Terror</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="campo-formulario">
                    <label htmlFor="lanzamiento">Año de Lanzamiento:</label>
                    <input type="number" id="lanzamiento" name="lanzamiento" value={juego.lanzamiento} onChange={handleChange} min="1950" max={new Date().getFullYear()} />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="imagenPortada">URL Imagen de Portada:</label>
                    <input type="url" id="imagenPortada" name="imagenPortada" value={juego.imagenPortada} onChange={handleChange} placeholder="https://ejemplo.com/portada.jpg" />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="horasJugadas">Horas Jugadas:</label>
                    <input type="number" id="horasJugadas" name="horasJugadas" value={juego.horasJugadas} onChange={handleChange} min="0" />
                </div>

                <div className="campo-formulario">
                    <label htmlFor="puntuacion">Puntuación (0 a 5):</label>
                    <input type="number" id="puntuacion" name="puntuacion" value={juego.puntuacion} onChange={handleChange} min="0" max="5" />
                </div>

                <div className="campo-formulario checkbox-container">
                    <input type="checkbox" id="completado" name="completado" checked={juego.completado} onChange={handleChange} />
                    <label htmlFor="completado" className="checkbox-label">Juego Completado</label>
                </div>

                <button type="submit" className="btn-principal" disabled={cargando}>
                    {cargando 
                        ? 'Guardando...' 
                        : esEdicion 
                            ? 'Guardar Cambios' 
                            : 'Agregar Juego a Biblioteca'
                    }
                </button>
                
            </form>
        </div>
    );
}

export default FormularioJuego;