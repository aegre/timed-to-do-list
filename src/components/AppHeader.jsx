import React from 'react';
import logo from '../Logo.png';

const AppHeader = () => {
    return (
        <div>
            <nav>
                <div id="main-logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div id="main-menu">
                    <a href="#" className="nav-link">Inicio</a>
                    <a href="#" className="nav-link">Estadísticas</a>
                </div>
            </nav>
        </div>
    );
};

export default AppHeader;