import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import TarjetaJuego from '../components/TarjetaJuego'; 
import { obtenerJuegos } from '../api/juegosAPI'; 


function BibliotecaJuegos() {

    const navigate = useNavigate();
    const [juegos, setJuegos] = useState([]); 
    const [cargando, setCargando] = useState(true); 

    useEffect( () =>  {
        const cargarJuegos = async () => {

              try {
                const juegosAPI = await obtenerJuegos(); 
                setJuegos(juegosAPI); 
                setCargando(false);
            } 

            catch (error) {
                console.error("Error al cargar juegos:", error);
                setCargando(false);
            }
        };

        cargarJuegos(); 

    }, []); 

    if (cargando) {

        return <h2 className="loading-message">Cargando biblioteca</h2>;
    }

    return (
        <div className="biblioteca-container">
           
            <h1>🎮 Mi Biblioteca de Videojuegos ({juegos.length} juegos)</h1>

            <div className="filtros-container">
               
                <input type="text" placeholder="Buscar por título o desarrollador" className="filtro-input" />
               
                <select className="filtro-select">
                    <option value="">Filtrar por género</option>
                </select>
               
                <button className="btn-agregar" onClick={() => navigate('/agregar')}  >
                    ➕ Agregar Nuevo Juego  </button>
             </div>

            {juegos.length === 0 && (
                 <p className="mensaje-vacio">Aún no hay juegos en tu biblioteca. ¡¡¡Agrega el primero!!!</p>
            )}

        <div className="juegos-grid">
            
                {juegos.map(juego => (

                    <TarjetaJuego

                        key={juego._id}
                        titulo={juego.titulo}
                        genero={juego.genero}
                        imagenPortada={juego.imagenPortada}
                        completado={juego.completado}
                        onEdit={() => navigate(`/editar/${juego._id}`)} 
                
                        />
            ))}
            </div>
        </div>
    );
}


export default BibliotecaJuegos;