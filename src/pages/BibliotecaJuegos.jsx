import TarjetaJuego from '../components/TarjetaJuego';


const juegosDePrueba = [
    { id: 1, titulo: "Cyberpunk 2077", genero: "RPG/Acción", imagenPortada: "https://via.placeholder.com/200x300?text=CP2077", completado: false },
    { id: 2, titulo: "Elden Ring", genero: "RPG", imagenPortada: "https://via.placeholder.com/200x300?text=Elden+Ring", completado: true },
    { id: 3, titulo: "Disco Elysium", genero: "RPG/Misterio", imagenPortada: "https://via.placeholder.com/200x300?text=Disco+E", completado: true },
];

function BibliotecaJuegos() {
    return (

        <div className="biblioteca-container">

             <h1>🎮 Mi Biblioteca</h1>
            <div className="filtros-container">
                <input type="text" placeholder="Buscar por título o desarrollador" className="filtro-input" />
                <select className="filtro-select">
                    <option value="">Filtrar por género</option>
                    
                 </select>
            <button className="btn-agregar">➕ Agregar Nuevo Juego</button>
            </div>


            <div className="juegos-grid">
               
                {juegosDePrueba.map(juego => (
                    <TarjetaJuego
                        key={juego.id} 
                        titulo={juego.titulo}
                        genero={juego.genero}
                        imagenPortada={juego.imagenPortada}
                        completado={juego.completado}
                    />
                ))}
            </div>
       
        </div>
    );
}

export default BibliotecaJuegos;