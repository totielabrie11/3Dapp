import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Petroleo() {
  const [backgroundImages, setBackgroundImages] = useState({}); // Estado para las imágenes de fondo por sección

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get('/api/pages/assignments');
      const assignments = response.data;
      console.log('Asignaciones obtenidas del backend:', assignments); // Log de la respuesta obtenida

      // Separar las asignaciones por página de forma dinámica
      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName } = assignment;
        if (!acc[pageName]) {
          acc[pageName] = [];
        }
        acc[pageName].push(assignment);
        return acc;
      }, {});

      // Log de asignaciones separadas por página
      Object.keys(assignmentsByPage).forEach(pageName => {
        console.log(`Asignaciones para la página ${pageName}:`, assignmentsByPage[pageName]);
      });

      // Identificar y trabajar con el array de la página "Petroleo"
      if (assignmentsByPage.Petroleo) {
        console.log('Trabajando con el array de la página Petroleo:', assignmentsByPage.Petroleo);

        // Crear un objeto para almacenar las imágenes de fondo por sección utilizando un map
        const sectionImages = {};
        assignmentsByPage.Petroleo.forEach((assignment) => {
          const section = assignment.section;
          const photoName = assignment.photoName;
          sectionImages[section] = photoName;
        });

        setBackgroundImages(sectionImages);
      }
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
    }
  }, []);

  // Cargar las asignaciones cuando se monte el componente
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return (
    <div>
      {/* Sección de encabezado con imagen de fondo */}
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
          {backgroundImages.encabezado ? (
            <img
              src={`/images/fondos/headeres/${backgroundImages.encabezado}`}
              alt="Fondo Petroleo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
              onError={() => console.error('Error al cargar la imagen desde:', backgroundImages.encabezado)}
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>

        {/* Texto del encabezado */}
        <div id="encabezado" className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <h1 className="mb-4" style={{ color: '#fff' }}>Sección de Petróleo en Argentina</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Explora las últimas noticias y desarrollos sobre la industria petrolera en Argentina.
          </p>
        </div>
      </div>

      {/* Secciones de contenido */}
      <div className="container">
        <section id="historia-petroleo" className="my-5" style={{
          backgroundImage: backgroundImages['Historia del Petróleo en Argentina'] ? `url(/images/fondos/headeres/${backgroundImages['Historia del Petróleo en Argentina']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Historia del Petróleo en Argentina</h2>
          <p>
            La industria petrolera en Argentina ha sido una parte importante de su desarrollo económico desde principios del siglo XX.
            Yacimientos como Vaca Muerta son conocidos a nivel mundial por su enorme potencial.
          </p>
        </section>

        <section id="principales-yacimientos" className="my-5" style={{
          backgroundImage: backgroundImages['Principales Yacimientos de Petróleo'] ? `url(/images/fondos/headeres/${backgroundImages['Principales Yacimientos de Petróleo']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Principales Yacimientos de Petróleo</h2>
          <p>
            Argentina cuenta con importantes yacimientos de petróleo y gas, entre los más conocidos están Vaca Muerta, Cerro Dragón y Chubut,
            que aportan una parte significativa de la producción nacional.
          </p>
        </section>

        <section id="impacto-economico" className="my-5" style={{
          backgroundImage: backgroundImages['Impacto Económico'] ? `url(/images/fondos/headeres/${backgroundImages['Impacto Económico']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Impacto Económico</h2>
          <p>
            El petróleo es un recurso clave para la economía argentina. Las inversiones en este sector generan empleo, infraestructura
            y son un motor para el crecimiento económico del país.
          </p>
        </section>

        <section id="futuro-industria" className="my-5" style={{
          backgroundImage: backgroundImages['Futuro de la Industria Petrolera'] ? `url(/images/fondos/headeres/${backgroundImages['Futuro de la Industria Petrolera']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Futuro de la Industria Petrolera</h2>
          <p>
            Con el avance de las energías renovables, el futuro de la industria petrolera enfrenta desafíos, pero sigue siendo crucial
            en la matriz energética global. Argentina continúa explorando nuevas oportunidades de crecimiento en este sector.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Petroleo;