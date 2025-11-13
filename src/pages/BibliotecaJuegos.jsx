import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import TarjetaJuego from '../components/TarjetaJuego'; 
import { obtenerJuegos } from '../api/juegosAPI'; 


function BibliotecaJuegos() {

    const navigate = useNavigate();
    const [juegos, setJuegos] = useState([]); 
    const [cargando, setCargando] = useState(true); 

    
    const cargarJuegos = async () => {
        try {
            const juegosAPI = await obtenerJuegos(); 
            setJuegos(juegosAPI); 
        } 
        catch (error) {
            console.error("Error al cargar juegos:", error);
        } finally {
            setCargando(false);
        }
    };

    useEffect( () =>  {
        cargarJuegos(); 
    }, []); 

    if (cargando) {
        return <h2 className="loading-message">Cargando biblioteca</h2>;
    }

    return (
        <div className="biblioteca-container">
            
            <h1>🎮 Mi Biblioteca de Videojuegos ({juegos.length} juegos)</h1>

            <div className="filtros-container">
               
                <button className="btn-agregar" onClick={() => navigate('/agregar')}  >
                    ➕ Agregar Nuevo Juego  </button>
             </div>

            {juegos.length === 0 && (
                 <p className="mensaje-vacio">Aún no hay juegos en tu biblioteca. ¡¡¡Agrega el primero!!!</p>
            )}

            <div className="juegos-grid">
                {juegos.map(juego => (

                    <TarjetaJuego
                        key={juego._id}
                        juego={juego} 
                        onJuegoEliminado={cargarJuegos}  />
                ))}
            </div>
        </div>
    );
}


export default BibliotecaJuegos;