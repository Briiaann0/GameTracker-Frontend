import { useState, useEffect, useMemo } from 'react'; 
import TarjetaJuego from '../components/TarjetaJuego'; 
import { obtenerJuegos } from '../api/juegosAPI'; 


function BibliotecaJuegos() {

    
    const [juegos, setJuegos] = useState([]); 
    const [cargando, setCargando] = useState(true);
    const [terminoBusqueda, setTerminoBusqueda] = useState(''); 
    const [filtroGenero, setFiltroGenero] = useState(''); 

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
    
    
    const handleFiltroGeneroChange = (e) => {
       
        setFiltroGenero(e.target.value);
    
    };

    
    const handleBusquedaChange = (e) => {
        setTerminoBusqueda(e.target.value);
    };

    
    const juegosFiltrados = useMemo(() => {
          let juegosResultado = juegos;
        const terminoMinusculas = terminoBusqueda.toLowerCase();

        
        if (filtroGenero) {
              juegosResultado = juegosResultado.filter(juego => juego.genero === filtroGenero);
        }
        
        
        if (terminoBusqueda) {
            juegosResultado = juegosResultado.filter(juego => 
                juego.titulo.toLowerCase().includes(terminoMinusculas) ||
             juego.desarrollador.toLowerCase().includes(terminoMinusculas)
            
            );
        }

        return juegosResultado;

    }, [juegos, filtroGenero, terminoBusqueda]);


    if (cargando) {

        return <h2 style={{ textAlign: 'center', marginTop: '100px', color: '#a0a0a0' }}>Cargando biblioteca</h2>;
    }

    return (
        <div className="biblioteca-container">
            
           
            <div className="barra-control">
                
                <input
                    type="text"
                    placeholder="Buscar "
                    className="input-buscador"
                    value={terminoBusqueda}
                    onChange={handleBusquedaChange} />

                
                <select className="filtro-select" value={filtroGenero} onChange={handleFiltroGeneroChange} >
                    <option value="">Filtrar Género</option>
                    <option value="RPG">RPG</option>
                    <option value="Accion">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="Terror">Terror</option>
                    <option value="Otro">Otro</option>
                </select>

               
            </div>


            {juegosFiltrados.length === 0 && (
                <p className="mensaje-vacio">
                    No se encontraron juegos
                </p>

            )}

            <div className="juegos-grid">
                  {juegosFiltrados.map(juego => (
                    
                    <TarjetaJuego
                        key={juego._id}
                        juego={juego}
                        onJuegoEliminado={cargarJuegos} />
                ))}
            </div>
        </div>
    );
}

export default BibliotecaJuegos;