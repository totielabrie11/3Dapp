import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Aguas() {
  const [principalVideo, setPrincipalVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(null); // Estado para el fondo condicional

  // Función para obtener el video principal desde el backend
  const fetchPrincipalVideo = async () => {
    try {
      const response = await axios.get('/api/videos');
      const videos = response.data.videos;
      const principal = videos.find(video => video.isPrincipal);

      if (principal) {
        console.log('Video principal encontrado:', principal.url);
        setPrincipalVideo(principal);
      } else {
        console.error("No se encontró un video marcado como principal.");
      }
    } catch (error) {
      console.error('Error al obtener el video principal:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el fondo condicional desde el backend
  const fetchBackgroundImage = async () => {
    try {
      const response = await axios.get('/api/background/Aguas');  // Llama al endpoint para obtener el fondo para "Aguas"
      setBackgroundImage(response.data.background);
    } catch (error) {
      console.error('Error al obtener el fondo:', error);
    }
  };

  // Cargar el video principal y el fondo cuando se monte el componente
  useEffect(() => {
    fetchPrincipalVideo();
    fetchBackgroundImage();  // Cargar el fondo condicional
  }, []);

  return (
    <div>
      {/* Sección del video de fondo */}
      <div 
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            opacity: 0.5,
            overflow: 'hidden',
          }}
        >
          {!loading && principalVideo ? (
            <video
              src={principalVideo.url}
              autoPlay
              muted
              loop
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
              onError={() => console.error('Error al cargar el video desde:', principalVideo.url)}
            />
          ) : (
            <p>Cargando video...</p>
          )}
        </div>

        {/* Encabezado debajo del video */}
        <div className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <h1 className="mb-4" style={{ color: '#fff' }}>Tratamiento de Agua Pura y Limpia</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Soluciones eficientes de dosificación para el tratamiento de agua potable en todo el país.
          </p>
        </div>
      </div>

      {/* Secciones adicionales con fondo condicional */}
      <div 
        className="bg-container" 
        style={{
          backgroundImage: backgroundImage ? `url('/images/fondos/${backgroundImage}')` : 'none',  // Aplica el fondo condicional
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          padding: '40px 0',  // Espaciado vertical
        }}
      >
        <div className="container">
          <section className="my-5">
            <h2>Sistemas Portátiles de Dosificación</h2>
            <p>
              Nuestros sistemas portátiles están diseñados para ofrecer soluciones rápidas y eficientes en el tratamiento de agua, 
              adaptándose a diferentes necesidades, desde comunidades pequeñas hasta grandes centros urbanos.
            </p>
          </section>

          <section className="my-5">
            <h2>Sistemas Robustos con Bombas Dosivac</h2>
            <p>
              Las bombas Dosivac proporcionan una dosificación precisa y segura, asegurando que el tratamiento de agua sea eficaz incluso en las condiciones más desafiantes. 
              Estos sistemas robustos están preparados para plantas de tratamiento de gran escala.
            </p>
          </section>

          <section className="my-5">
            <h2>Beneficios de la Dosificación Eficiente</h2>
            <p>
              La dosificación eficiente de productos químicos en el agua no solo asegura la pureza del agua potable, sino que también optimiza los costos operativos 
              y reduce el desperdicio. Esto resulta en agua limpia y segura para todos.
            </p>
          </section>

          <section className="my-5">
            <h2>Impacto Ambiental del Tratamiento de Agua</h2>
            <p>
              El tratamiento de agua no solo tiene un impacto positivo en la salud pública, sino que también juega un rol clave en la preservación del medio ambiente. 
              Con nuestras tecnologías avanzadas, reducimos la contaminación y promovemos la sostenibilidad.
            </p>
          </section>

          <section className="my-5">
            <h2>El Futuro del Agua Pura</h2>
            <p>
              A medida que avanzan las tecnologías, el futuro del tratamiento de agua apunta hacia soluciones aún más eficientes y sostenibles, con sistemas automatizados 
              que garantizarán agua pura y limpia para las generaciones futuras.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Aguas;
