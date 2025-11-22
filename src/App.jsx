import { Routes, Route } from 'react-router-dom';
import BibliotecaJuegos from './pages/BibliotecaJuegos'; 
import FormularioJuego from './pages/FormularioJuego';
import DetalleJuego from './pages/DetalleJuego';
import Navbar from './components/Navbar';

function App() {

  return (
    <>  
    <Navbar />
    <Routes> 
      
    
      <Route path="/" element={<BibliotecaJuegos />} />
      <Route path="/agregar" element={<FormularioJuego />} />
      <Route path="/editar/:id" element={<FormularioJuego />} /> 
      <Route path="/juego/:id" element={<DetalleJuego />} /> 

      
      <Route path="*" element= {<h1>404 | Página no encontrada</h1>} /> 

    </Routes>
    </>
  );
}

export default App;