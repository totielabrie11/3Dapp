import React, { useEffect } from 'react';
import Novedades from './Novedades';
import Equipo from './Equipo';
import Distribuidores from './Distribuidores/Distribuidores';
import HomeCarousel from './HomeCarousel';
import Contacto from './Contacto/Contacto'; // Importamos el componente de Contacto
import Mercados from './Mercados/Mercados'; // Importamos el nuevo componente de Mercados
import Empresa from './Empresa/Empresa'; 
import Historia from './Historia/Historia'; 
import SubscriptionNewsLatter from './NewsLatter/SubscriptionNewsLatter'

const Home = () => {

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 0) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Header con el carrusel */}
            <header className="masthead" id="home">
                <HomeCarousel />
                <div className="container">
                    <div className="masthead-subheading">Welcome To Our Studio!</div>
                </div>
            </header>
            
            {/* Sección de Explora Nuestros Mercados */}
            <Mercados />
            
            <Empresa />
            <Historia />
            <Equipo />

            <Distribuidores />
            <Novedades />
            {/* Sección de Contacto */}
            <Contacto />
            <SubscriptionNewsLatter />
            {/* Footer */}
       
        </div>
    );
};  

export default Home;