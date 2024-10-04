import React, { useEffect } from 'react';
import Novedades from './Novedades';
import Equipo from './Equipo';
import Distribuidores from './Distribuidores/Distribuidores';
import HomeCarousel from './HomeCarousel';
import Contacto from './Contacto/Contacto'; // Importamos el componente de Contacto

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


            {/* Sección de Portafolio */}
{/*             <section className="page-section bg-light" id="portfolio">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Portafolio</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/1.jpg" alt="Portfolio 1" />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">Threads</div>
                                    <div className="portfolio-caption-subheading text-muted">Illustration</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/2.jpg" alt="Portfolio 2" />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">Explore</div>
                                    <div className="portfolio-caption-subheading text-muted">Graphic Design</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal3">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/3.jpg" alt="Portfolio 3" />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">Finish</div>
                                    <div className="portfolio-caption-subheading text-muted">Identity</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            

            {/* Sección de About */}
            <section className="page-section" id="about">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Nosotros</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <ul className="timeline">
                        {/* Timeline items */}
                    </ul>
                </div>
            </section>
            
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
