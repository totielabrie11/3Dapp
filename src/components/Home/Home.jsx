import React, { useEffect } from 'react';
import Novedades from './Novedades';
import Equipo from './Equipo';
import Distribuidores from './Distribuidores/Distribuidores';
import HomeCarousel from './HomeCarousel';
import Contacto from './Contacto/Contacto'; // Importamos el componente de Contacto
import Mercados from './Mercados/Mercados'; // Importamos el nuevo componente de Mercados
import Empresa from './Empresa/Empresa'; 

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
            
            <Equipo />

            <Distribuidores />
            <Novedades />
            {/* Sección de Contacto */}
            <Contacto />

            {/* Footer */}
            <footer className="footer py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-start">Copyright &copy; Tu Sitio 2023</div>
                        <div className="col-lg-4 my-3 my-lg-0">
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <a className="link-dark text-decoration-none me-3" href="#!">Política de Privacidad</a>
                            <a className="link-dark text-decoration-none" href="#!">Términos de Uso</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};  

export default Home;