import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Petroleo() {
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
      const response = await axios.get('/api/background/Petroleo');  // Llama al endpoint para obtener el fondo para "Petroleo"
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
          <h1 className="mb-4" style={{ color: '#fff' }}>Sección de Petróleo en Argentina</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Explora las últimas noticias y desarrollos sobre la industria petrolera en Argentina.
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
            <h2>Historia del Petróleo en Argentina</h2>
            <p>
              La industria petrolera en Argentina ha sido una parte importante de su desarrollo económico desde principios del siglo XX.
              Yacimientos como Vaca Muerta son conocidos a nivel mundial por su enorme potencial.
            </p>
          </section>

          <section className="my-5">
            <h2>Principales Yacimientos de Petróleo</h2>
            <p>
              Argentina cuenta con importantes yacimientos de petróleo y gas, entre los más conocidos están Vaca Muerta, Cerro Dragón y Chubut,
              que aportan una parte significativa de la producción nacional.
            </p>
          </section>

          <section className="my-5">
            <h2>Impacto Económico</h2>
            <p>
              El petróleo es un recurso clave para la economía argentina. Las inversiones en este sector generan empleo, infraestructura
              y son un motor para el crecimiento económico del país.
            </p>
          </section>

          <section className="my-5">
            <h2>Futuro de la Industria Petrolera</h2>
            <p>
              Con el avance de las energías renovables, el futuro de la industria petrolera enfrenta desafíos, pero sigue siendo crucial
              en la matriz energética global. Argentina continúa explorando nuevas oportunidades de crecimiento en este sector.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Petroleo;
