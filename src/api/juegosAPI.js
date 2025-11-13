
const BASE_URL = 'http://localhost:3000/api/juegos'; 


export const crearJuego = async (juegoData) => {

    try {

        const response = await fetch(BASE_URL, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },

            body: JSON.stringify(juegoData), 
        });

        if (!response.ok) {

            throw new Error(`Error al crear el juego: ${response.statusText}`);
        }

        return await response.json(); 

    } catch (error) 
    {

        console.error('Error en la petición POST:', error.message);
        throw error;
    }

 };

    export const obtenerJuegos = async () => {
        
    try {
         const response = await fetch(BASE_URL);

        if (!response.ok) {

        throw new Error(`Error al obtener los juegos: ${response.statusText}`);  }

        return await response.json(); 

    } catch (error) 
    {

        console.error('Error en la petición GET:', error.message);
        throw error;
    }
};
