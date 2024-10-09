import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomeCarousel = () => {
  // Estado para almacenar las imágenes del carrusel
  const [carouselImages, setCarouselImages] = useState([]);
  // Estado para almacenar las descripciones adicionales
  const [additionalDescriptions, setAdditionalDescriptions] = useState([]);

  // Función para obtener las imágenes del servidor
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Obtener imágenes
        const response = await axios.get('/api/images'); // Endpoint que devuelve las imágenes
        setCarouselImages(response.data.images);  // Actualizar el estado con las imágenes

        // Obtener descripciones adicionales
        const descriptionsResponse = await axios.get('/api/fotoText'); // Endpoint para descripciones adicionales
        setAdditionalDescriptions(descriptionsResponse.data);  // Actualizar el estado con las descripciones adicionales

        // Mostrar las descripciones en la consola
        console.log('Imágenes obtenidas:', response.data.images);
        console.log('Descripciones adicionales obtenidas:', descriptionsResponse.data);
      } catch (error) {
        console.error('Error al cargar las imágenes o descripciones:', error);
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
        {carouselImages.map((image, index) => {
          // Buscar la descripción correspondiente en los datos adicionales obtenidos de la API
          const matchingDescription = additionalDescriptions.find(desc => desc.name === image.name)?.description || '';

          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              style={styles.carouselItem(image.url)}
            >
              <div style={styles.textOverlay}>
                <h2>{matchingDescription}</h2>
              </div>
            </div>
          );
        })}
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

const styles = {
  carouselItem: (url) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    height: '100vh',
    backgroundPosition: 'center',
    position: 'relative',
  }),
  textOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    zIndex: 10,
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.4)'
  },
};

export default HomeCarousel;