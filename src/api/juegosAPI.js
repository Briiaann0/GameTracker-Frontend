const BASE_URL = 'http://localhost:3000/api/juegos'; 


export const obtenerJuegos = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener los juegos: ${response.statusText}`); 
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error en la petición GET de todos los juegos:', error.message);
        throw error;
    }
};

export const obtenerJuegoPorId = async (id) => {
    try {
        
        const response = await fetch(`${BASE_URL}/${id}`); 
        if (!response.ok) {
            throw new Error(`Error al obtener el juego ${id}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en la petición GET para el juego ${id}:`, error.message);
        throw error;
    }
};


export const guardarJuego = async (juego, id = null) => {
    
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${BASE_URL}/${id}` : BASE_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(juego),
        });

        if (!response.ok) {
            throw new Error(`Error al ${id ? 'actualizar' : 'crear'} el juego. Código: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error en la petición ${method} al guardar juego:`, error.message);
        throw error;
    }
};


export const eliminarJuego = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar el juego ${id}. Código: ${response.status}`);
        }
       
    } catch (error) {
        console.error(`Error en la petición DELETE para el juego ${id}:`, error.message);
        throw error;
    }
};