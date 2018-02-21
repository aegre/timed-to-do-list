import React from 'react';
import { Link } from "react-router-dom";

import logo from '../Logo.png';
import { ROUTE_STADISTICS, ROUTE_HOME } from '../constants/routes';

const AppHeader = () => {
    return (
        <div>
            <nav>
                <div id="main-logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div id="main-menu">
                    <Link to={ROUTE_HOME} className="nav-link ">
                        <span className="hide-on-low">Inicio </span>
                        <i className="fas fa-home"/>
                    </Link>
                    <Link to={ROUTE_STADISTICS} className="nav-link">
                        <span className="hide-on-low">Estadísticas </span> 
                        <i className="far fa-chart-bar"/>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default AppHeader;