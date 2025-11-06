
const TarjetaJuego = ({ titulo, genero, imagenPortada, completado }) => {


    return (
        <div className="tarjeta-juego">
            <img 
                src={imagenPortada ||  'placeholder.jpg'} 

                alt={`Portada de ${titulo}`} 
                className="tarjeta-imagen" 
            />


            <div className="tarjeta-info">

                <h3 className="tarjeta-titulo">{titulo || "Título del Juego"}</h3>

                <p className="tarjeta-genero">Género: {genero || "Acción/RPG"}</p>

                <div className={`tarjeta-estado ${completado ? 'completo' : 'pendiente'}`}>

                    {completado ? '✅ COMPLETADO' : '⏳ PENDIENTE'}


                </div>
            </div>

            <div className="tarjeta-acciones">

                <button className="btn-editar">Editar</button>
                
                <button className="btn-eliminar">Eliminar</button>
            </div>
        </div>
    );
}

export default TarjetaJuego;