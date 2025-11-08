function FormularioJuego() {
    
    const esEditar = false; 

    return (
        <div className="formulario-container">

            <h2>{esEditar ? '🛠️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h2>
            
            <form className="juego-form">
                
                
                <div className="form-group">
                    <label htmlFor="titulo">Título del Juego:</label>
                    <input type="text" id="titulo" name="titulo" placeholder="Ej: The Legend of Zelda" required />
                </div>
                
                

                <div className="form-group">
                    <label htmlFor="desarrollador">Desarrollador:</label>
                    <input type="text" id="desarrollador" name="desarrollador" placeholder="Ej: Nintendo" required />
                </div>
                
                

                <div className="form-group">
                      <label htmlFor="genero">Género Principal:</label>
                    <select id="genero" name="genero" required>
                        <option value="">Selecciona un género</option>
                        <option value="RPG">RPG</option>
                        <option value="Accion">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Terror">Terror</option>
                
                    </select>
                </div>
                
               
                <div className="form-group">
                <label htmlFor="añoLanzamiento">Año de Lanzamiento:</label>
                    <input type="number" id="añoLanzamiento" name="añoLanzamiento" placeholder="Ej: 2023" />
                </div>
                
               
                <div className="form-group">
                    <label htmlFor="imagenPortada">URL Imagen de Portada:</label>
                    <input type="url" id="imagenPortada" name="imagenPortada" placeholder="https://ejemplo.com/portada.jpg" />
                </div>

               
                 <div className="form-group checkbox-group">
                    <input type="checkbox" id="completado" name="completado" />
                    <label htmlFor="completado">Juego Completado</label>
                </div>

              
                <button type="submit" className="btn-submit">
                    {esEditar ? 'Guardar Cambios' : 'Agregar Juego a Biblioteca'}
                </button>
                
            </form>
        </div>
    );
}

export default FormularioJuego;