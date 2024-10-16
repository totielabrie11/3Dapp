import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Refrigeracion() {
  const [backgroundImages, setBackgroundImages] = useState({});

  // Función para normalizar el texto: convertir a minúsculas y quitar acentos
  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Elimina acentos
  };

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get('/api/pages/assignments');
      const assignments = response.data;
      console.log('Asignaciones obtenidas del backend:', assignments);

      // Separar las asignaciones por página de forma dinámica
      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName } = assignment;
        const normalizedPageName = normalizeString(pageName); // Normalizar el nombre de la página
        if (!acc[normalizedPageName]) {
          acc[normalizedPageName] = [];
        }
        acc[normalizedPageName].push(assignment);
        return acc;
      }, {});

      // Log de asignaciones separadas por página
      Object.keys(assignmentsByPage).forEach(pageName => {
        console.log(`Asignaciones para la página ${pageName}:`, assignmentsByPage[pageName]);
      });

      // Identificar y trabajar con el array de la página "Refrigeracion"
      if (assignmentsByPage.refrigeracion) {
        console.log('Trabajando con el array de la página Refrigeracion:', assignmentsByPage.refrigeracion);

        // Crear un objeto para almacenar las imágenes de fondo por sección
        const sectionImages = {};
        assignmentsByPage.refrigeracion.forEach((assignment) => {
          const normalizedSection = normalizeString(assignment.section); // Normalizar la sección
          const photoName = assignment.photoName;
          sectionImages[normalizedSection] = photoName;
        });

        setBackgroundImages(sectionImages);
      }
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  useEffect(() => {
    console.log('Imagen de encabezado:', backgroundImages.encabezado);
  }, [backgroundImages]);

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
              alt="Fondo Refrigeración"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
              onError={() => console.error('Error al cargar la imagen desde:', `/images/fondos/headeres/${backgroundImages.encabezado}`)}
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>

        <div id="encabezado" className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <h1 className="mb-4" style={{ color: '#fff' }}>La Industria de Bombas de Vacío para Uso en Refrigeración</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Orientada al mecánico en refrigeración, con soluciones eficientes para sistemas de refrigeración en todo tipo de instalaciones.
          </p>
        </div>
      </div>

      {/* Secciones de contenido */}
      <div className="container">
        {/* Sección: Sistemas Industriales de Vacío */}
        <section id="sistemas-industriales" className="my-5" style={{
          backgroundImage: backgroundImages[normalizeString('Sistemas Industriales de Vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Sistemas Industriales de Vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Sistemas Industriales de Vacío</h2>
          <p>
            Los sistemas de vacío industriales están diseñados para satisfacer las demandas de la refrigeración comercial y doméstica, proporcionando alta eficiencia y rendimiento en diversas aplicaciones.
          </p>
        </section>

        {/* Sección: Aplicaciones en Refrigeración */}
        <section id="aplicaciones-refrigeracion" className="my-5" style={{
          backgroundImage: backgroundImages[normalizeString('Aplicaciones en Refrigeración')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Aplicaciones en Refrigeración')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Aplicaciones en Refrigeración</h2>
          <p>
            Las bombas de vacío juegan un rol crucial en los sistemas de refrigeración, permitiendo una extracción eficiente de gases y asegurando un rendimiento óptimo en la transferencia de calor.
          </p>
        </section>

        {/* Sección: Eficiencia de los Sistemas de Vacío */}
        <section id="eficiencia-sistemas" className="my-5" style={{
          backgroundImage: backgroundImages[normalizeString('Eficiencia de los Sistemas de Vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Eficiencia de los Sistemas de Vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Eficiencia de los Sistemas de Vacío</h2>
          <p>
            La eficiencia de los sistemas de vacío es fundamental para garantizar que el proceso de refrigeración sea económico y respetuoso con el medio ambiente, ayudando a reducir el consumo energético.
          </p>
        </section>

        {/* Sección: Mantenimiento Preventivo de Sistemas de Vacío */}
        <section id="mantenimiento-preventivo" className="my-5" style={{
          backgroundImage: backgroundImages[normalizeString('Mantenimiento Preventivo de Sistemas de Vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Mantenimiento Preventivo de Sistemas de Vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Mantenimiento Preventivo de Sistemas de Vacío</h2>
          <p>
            El mantenimiento preventivo es esencial para prolongar la vida útil de los sistemas de vacío y garantizar un rendimiento óptimo. Descubre nuestras recomendaciones para el mantenimiento periódico.
          </p>
        </section>

        {/* Sección: Nuevas Tecnologías en Sistemas de Vacío */}
        <section id="nuevas-tecnologias" className="my-5" style={{
          backgroundImage: backgroundImages[normalizeString('Nuevas Tecnologías en Sistemas de Vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Nuevas Tecnologías en Sistemas de Vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Nuevas Tecnologías en Sistemas de Vacío</h2>
          <p>
            Conoce las nuevas tecnologías que están revolucionando los sistemas de vacío en la industria de la refrigeración, mejorando la eficiencia y reduciendo el impacto ambiental.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Refrigeracion;
