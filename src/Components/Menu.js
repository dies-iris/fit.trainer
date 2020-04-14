import React from 'react';

export default function Menu (props) {


    return(
        <header className="site-header">
            <div className="site-branding">            
                <a className="custom-logo-link" href="/">
                    <img className="custom-logo" src="/wp-content/uploads/2019/07/logoAccueil-1.png" alt="" />
                </a>    
            </div>
            <div className="main-navigation"> 
                <div className="menu-menu1-container">
                    <ul className="menu nav-menu">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="#">Boutique</a></li>
                        <li><a href="https://projetiw2.buroscope.eu/mon-compte/customer-logout">Se deconnecter</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}