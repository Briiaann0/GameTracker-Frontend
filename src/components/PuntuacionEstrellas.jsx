import React from 'react';


function PuntuacionEstrellas({ puntuacion }) {
   
    const totalEstrellas = 5;
    
    const estrellasLlenas = Math.round(puntuacion || 0); 

    let estrellas = [];
    
    for (let i = 1; i <= totalEstrellas; i++) {
          estrellas.push(
            <span 
                key={i} 
                className={i <= estrellasLlenas ? 'estrella-llena' : ''} >
                ★  </span>
        );
    }

    return (

        <div className="estrellas-container">

            {estrellas}
            
        </div>
    );
}

export default PuntuacionEstrellas;