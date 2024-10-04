import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeCarousel = () => {
  // Estado para almacenar las imágenes del carrusel
  const [carouselImages, setCarouselImages] = useState([]);

  // Función para obtener las imágenes del servidor
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/images'); // Endpoint que devuelve las imágenes
        setCarouselImages(response.data.images);  // Actualizar el estado con las imágenes
      } catch (error) {
        console.error('Error al cargar las imágenes del carrusel:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores de carrusel */}
      <div className="carousel-indicators">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Elementos del carrusel */}
      <div className="carousel-inner">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              height: '100vh',  // Aseguramos que ocupe toda la pantalla
              backgroundPosition: 'center',
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h5>{image.name}</h5> {/* Puedes personalizar los nombres de las imágenes si lo deseas */}
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HomeCarousel;

