import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aguas.css';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL desde config.js

function Aguas() {
  const [backgroundImages, setBackgroundImages] = useState({}); // Estado para las imágenes de fondo por sección
  const [sectionColors, setSectionColors] = useState({
    'sistemas-portatiles': '#FFFFFF',
    'sistemas-robustos': '#FFFFFF',
    'beneficios-dosificacion': '',
    'impacto-ambiental': '',
    'futuro-agua-pura': ''
  });

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`); // Usar BACKEND_URL
      const assignments = response.data;
      console.log('Asignaciones obtenidas del backend:', assignments);

      // Separar las asignaciones por página de forma dinámica
      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName } = assignment;
        if (!acc[pageName]) {
          acc[pageName] = [];
        }
        acc[pageName].push(assignment);
        return acc;
      }, {});

      Object.keys(assignmentsByPage).forEach(pageName => {
        console.log(`Asignaciones para la página ${pageName}:`, assignmentsByPage[pageName]);
      });

      // Identificar y trabajar con el array de la página "Aguas"
      if (assignmentsByPage.Aguas) {
        console.log('Trabajando con el array de la página Aguas:', assignmentsByPage.Aguas);

        // Crear un objeto para almacenar las imágenes de fondo por sección utilizando un map
        const sectionImages = {};
        assignmentsByPage.Aguas.forEach((assignment) => {
          const section = assignment.section.toLowerCase();
          const photoName = assignment.photoName;
          sectionImages[section] = photoName;
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
              alt="Fondo Aguas"
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
        <div id="encabezado" className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px', backgroundSize: 'cover' }}>
          <h1 className="mb-4 text-white">
            Aguas, Industrias y Tratamiento de Efluentes
          </h1>
          <p className="mb-5 text-white">
            En Dosivac, nos especializamos en proporcionar equipos que optimizan el manejo y la distribución de fluidos, contribuyendo a procesos más eficientes y sostenibles en la purificación, distribución y gestión del agua. Nuestro equipo está diseñado para ofrecer un sistema de dosificación completo con todos los accesorios y la estructura necesaria en el área de trabajo.
          </p>
        </div>
      </div>

      {/* Secciones de contenido */}
      <section id="sistemas-robustos" className="my-5 sistemas-robustos">
        <div className="container">
          <h2 className="text-center">Sistemas de Dosificación de Alta Calidad</h2>
          <p className="text-center">
            En Dosivac, ofrecemos equipos de dosificación diseñados para garantizar la máxima eficiencia 
            y seguridad en el manejo de fluidos. Nuestros sistemas están disponibles en capacidades de 1000 
            y 200 litros, cada uno adaptado a diferentes requerimientos industriales y de tratamiento de agua.
          </p>
          <div className="row text-center">
            <div className="col-md-6">
              <div className="equipo-image" id="equipo-1000-img">
                <img src="assets/img/portfolio/eq1000.png" alt="eq1000" />
              </div>
              <h3>Equipo de 1000 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 60 x 91</li>
                <li><strong>Caudal máximo:</strong> 840 l/d</li>
                <li><strong>Presión máxima:</strong> 650 kg/cm2</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
            <div className="col-md-6">
              <div className="equipo-image" id="equipo-200-img">
                <img src="assets/img/portfolio/equipo200.jpg" alt="equipo200" />
              </div>
              <h3>Equipo de 200 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 76 x 100</li>
                <li><strong>Caudal máximo:</strong> 5200 l/d</li>
                <li><strong>Presión máxima:</strong> 200 kg/cm2</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección para Sistemas Portátiles de Dosificación */}
      <section id="sistemas-portatiles" className="my-5" style={{
        backgroundColor: sectionColors['sistemas-portatiles'] || 'transparent',
        backgroundImage: !sectionColors['sistemas-portatiles'] && backgroundImages['sistemas portátiles de dosificación'] ? `url(/images/fondos/headeres/${backgroundImages['sistemas portátiles de dosificación']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>Sistemas Portátiles de Dosificación</h2>
        <p>
          Nuestros sistemas portátiles están diseñados para ofrecer soluciones rápidas y eficientes en el tratamiento de agua,
          adaptándose a diferentes necesidades, desde comunidades pequeñas hasta grandes centros urbanos.
        </p>
      </section>

      {/* Sección para Beneficios de la Dosificación Eficiente */}
      <section id="beneficios-dosificacion" className="my-5" style={{
        backgroundColor: sectionColors['beneficios-dosificacion'] || 'transparent',
        backgroundImage: !sectionColors['beneficios-dosificacion'] && backgroundImages['beneficios de la dosificación eficiente'] ? `url(/images/fondos/headeres/${backgroundImages['beneficios de la dosificación eficiente']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>Beneficios de la Dosificación Eficiente</h2>
        <p>
          La dosificación eficiente de productos químicos en el agua no solo asegura la pureza del agua potable, sino que también optimiza los costos operativos
          y reduce el desperdicio, lo que garantiza agua limpia y segura para todos.
        </p>
      </section>

      {/* Sección para Impacto Ambiental del Tratamiento de Agua */}
      <section id="impacto-ambiental" className="my-5" style={{
        backgroundColor: sectionColors['impacto-ambiental'] || 'transparent',
        backgroundImage: !sectionColors['impacto-ambiental'] && backgroundImages['impacto ambiental del tratamiento de agua'] ? `url(/images/fondos/headeres/${backgroundImages['impacto ambiental del tratamiento de agua']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>Impacto Ambiental del Tratamiento de Agua</h2>
        <p>
          El tratamiento de agua no solo tiene un impacto positivo en la salud pública, sino que también juega un rol clave en la preservación del medio ambiente.
          Nuestras tecnologías avanzadas reducen la contaminación y promueven la sostenibilidad.
        </p>
      </section>

      {/* Sección para El Futuro del Agua Pura */}
      <section id="futuro-agua-pura" className="my-5" style={{
        backgroundColor: sectionColors['futuro-agua-pura'] || 'transparent',
        backgroundImage: !sectionColors['futuro-agua-pura'] && backgroundImages['el futuro del agua pura'] ? `url(/images/fondos/headeres/${backgroundImages['el futuro del agua pura']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>El Futuro del Agua Pura</h2>
        <p>
          A medida que las tecnologías avanzan, el futuro del tratamiento de agua apunta hacia soluciones aún más eficientes y sostenibles, con sistemas automatizados
          que garantizarán agua pura y limpia para las generaciones futuras.
        </p>
      </section>
    </div>
  );
}

export default Aguas;
