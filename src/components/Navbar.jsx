import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div 
                className="navbar-logo" 
                   onClick={() => navigate('/')}
            >
                GAME TRACKER
            </div>
              
            <div className="navbar-links">
               
                <button 
                    className="btn-principal" 
                    onClick={() => navigate('/agregar')}
                >
                    + Nuevo
                </button>
       
            </div>
        </nav>
    );
}

export default Navbar;