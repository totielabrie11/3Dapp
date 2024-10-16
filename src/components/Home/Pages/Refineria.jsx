import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Refineria() {
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

      // Identificar y trabajar con el array de la página "Refineria"
      if (assignmentsByPage.Refineria) {
        console.log('Trabajando con el array de la página Refineria:', assignmentsByPage.Refineria);

        // Crear un objeto para almacenar las imágenes de fondo por sección utilizando un map
        const sectionImages = {};
        assignmentsByPage.Refineria.forEach((assignment) => {
          const section = assignment.section.toLowerCase(); // Convertir a minúsculas para evitar discrepancias
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

  useEffect(() => {
    // Log para verificar si el valor de 'encabezado' está presente
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
              alt="Fondo Refineria"
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

        {/* Texto del encabezado */}
        <div id="encabezado" className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <h1 className="mb-4" style={{ color: '#fff' }}>Soluciones Robustas y Confiables para Minería y Refinería</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Dosivac ofrece equipos de vacío que soportan ambientes rigurosos, mejorando la eficiencia y seguridad en las operaciones mineras.
          </p>
        </div>
      </div>

      {/* Secciones de contenido */}
      <div className="container">
        <section id="bombas-vacio" className="my-5" style={{
          backgroundImage: backgroundImages['bombas de vacío'] ? `url(/images/fondos/headeres/${backgroundImages['bombas de vacío']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Bombas de Vacío</h2>
          <p>
            Nuestras bombas de vacío están diseñadas para soportar las duras condiciones de la minería y refinería, asegurando un rendimiento constante y confiable.
          </p>
        </section>

        <section id="equipos-mineria" className="my-5" style={{
          backgroundImage: backgroundImages['equipos para minería'] ? `url(/images/fondos/headeres/${backgroundImages['equipos para minería']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Equipos para Minería</h2>
          <p>
            Los equipos Dosivac están diseñados para mejorar la eficiencia operativa en las minas, aumentando la productividad y garantizando la seguridad de los trabajadores.
          </p>
        </section>

        <section id="eficiencia-seguridad" className="my-5" style={{
          backgroundImage: backgroundImages['eficiencia y seguridad'] ? `url(/images/fondos/headeres/${backgroundImages['eficiencia y seguridad']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Eficiencia y Seguridad</h2>
          <p>
            Mejoramos la eficiencia de las operaciones mineras y refineras a través de nuestras soluciones robustas que garantizan un entorno de trabajo seguro y confiable.
          </p>
        </section>

        <section id="nuevas-tecnologias" className="my-5" style={{
          backgroundImage: backgroundImages['nuevas tecnologías en equipos de vacío'] ? `url(/images/fondos/headeres/${backgroundImages['nuevas tecnologías en equipos de vacío']})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <h2>Nuevas Tecnologías en Equipos de Vacío</h2>
          <p>
            Descubre las últimas tecnologías que están revolucionando el uso de equipos de vacío en minería y refinería, mejorando la eficiencia y reduciendo el impacto ambiental.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Refineria;