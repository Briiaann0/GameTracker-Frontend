import { useState } from 'react'
import TarjetaJuego from './components/TarjetaJuego';
import './App.css'

function App() {

  return (
    <div className="app-container">
            <h1>GameTracker - Mi Biblioteca Personal</h1>
            
            {/* { Ejemplo de la Tarjeta } */}
            <TarjetaJuego
                titulo="Cyberpunk 2077"
                genero="RPG/Acción"
                imagenPortada="https://via.placeholder.com/200x300.png?text=Cyberpunk"
                completado={false}
            />

            <TarjetaJuego
                titulo="Elden Ring"
                genero="RPG"
                imagenPortada="https://via.placeholder.com/200x300.png?text=Elden+Ring"
                completado={true}
            />
            
        </div>
  )
}

export default App
