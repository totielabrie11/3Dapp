import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Aguas() {
  const [backgroundImage, setBackgroundImage] = useState(null); // Estado para la imagen de fondo condicional

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get('/api/pages/assignments');
      const assignments = response.data;
      if (assignments.aplicarPaginas && assignments.aplicarPaginas.Aguas) {
        const encabezadoAssignment = assignments.aplicarPaginas.Aguas.find(assignment => assignment.section === 'encabezado');
        if (encabezadoAssignment) {
          setBackgroundImage(encabezadoAssignment.photoName);
        }
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
          {backgroundImage ? (
            <img
              src={`/images/fondos/headeres/${backgroundImage}`}
              alt="Fondo Aguas"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
              onError={() => console.error('Error al cargar la imagen desde:', backgroundImage)}
            />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>

        {/* Texto del encabezado */}
        <div id="encabezado" className="container text-center" style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}>
          <h1 className="mb-4" style={{ color: '#fff' }}>Tratamiento de Agua Pura y Limpia</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            Soluciones eficientes de dosificación para el tratamiento de agua potable en todo el país.
          </p>
        </div>
      </div>

      {/* Secciones de contenido */}
      <div className="container">
        <section id="sistemas-portatiles" className="my-5">
          <h2>Sistemas Portátiles de Dosificación</h2>
          <p>
            Nuestros sistemas portátiles están diseñados para ofrecer soluciones rápidas y eficientes en el tratamiento de agua,
            adaptándose a diferentes necesidades, desde comunidades pequeñas hasta grandes centros urbanos.
          </p>
        </section>

        <section id="sistemas-robustos" className="my-5">
          <h2>Sistemas Robustos con Bombas Dosivac</h2>
          <p>
            Las bombas Dosivac proporcionan una dosificación precisa y segura, asegurando que el tratamiento de agua sea eficaz incluso en las condiciones más desafiantes.
            Estos sistemas robustos están preparados para plantas de tratamiento de gran escala.
          </p>
        </section>

        <section id="beneficios-dosificacion" className="my-5">
          <h2>Beneficios de la Dosificación Eficiente</h2>
          <p>
            La dosificación eficiente de productos químicos en el agua no solo asegura la pureza del agua potable, sino que también optimiza los costos operativos
            y reduce el desperdicio, lo que garantiza agua limpia y segura para todos.
          </p>
        </section>

        <section id="impacto-ambiental" className="my-5">
            <h2>Impacto Ambiental del Tratamiento de Agua</h2>
            <p>
              El tratamiento de agua no solo tiene un impacto positivo en la salud pública, sino que también juega un rol clave en la preservación del medio ambiente.
              Nuestras tecnologías avanzadas reducen la contaminación y promueven la sostenibilidad.
            </p>
          </section>
  
          <section id="futuro-agua-pura" className="my-5">
            <h2>El Futuro del Agua Pura</h2>
            <p>
              A medida que las tecnologías avanzan, el futuro del tratamiento de agua apunta hacia soluciones aún más eficientes y sostenibles, con sistemas automatizados
              que garantizarán agua pura y limpia para las generaciones futuras.
            </p>
          </section>
        </div>
      </div>
    );
  }
  
  export default Aguas;