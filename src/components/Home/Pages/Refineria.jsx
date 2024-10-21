import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACKEND_URL } from '../../configLocalHost'; // Asegúrate de tener la ruta correcta
import Encabezado from './Encabezado'; // Importamos el nuevo componente

function Refineria() {
  const [backgroundImages, setBackgroundImages] = useState({}); // Estado para las imágenes de fondo por sección

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`); // Usar BACKEND_URL en la llamada a la API
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

  return (
    <div>
      {/* Componente Encabezado con imagen de fondo */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

      {/* Secciones de contenido */}
      <div className="container">
        <section
          id="bombas-vacio"
          className="my-5"
          style={{
            backgroundImage: backgroundImages['bombas de vacío']
              ? `url(${BACKEND_URL}/images/fondos/headeres/${backgroundImages['bombas de vacío']})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2>Bombas de Vacío</h2>
          <p>
            Nuestras bombas de vacío están diseñadas para soportar las duras
            condiciones de la minería y refinería, asegurando un rendimiento
            constante y confiable.
          </p>
        </section>

        <section
          id="equipos-mineria"
          className="my-5"
          style={{
            backgroundImage: backgroundImages['equipos para minería']
              ? `url(${BACKEND_URL}/images/fondos/headeres/${backgroundImages['equipos para minería']})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2>Equipos para Minería</h2>
          <p>
            Los equipos Dosivac están diseñados para mejorar la eficiencia
            operativa en las minas, aumentando la productividad y garantizando
            la seguridad de los trabajadores.
          </p>
        </section>

        <section
          id="eficiencia-seguridad"
          className="my-5"
          style={{
            backgroundImage: backgroundImages['eficiencia y seguridad']
              ? `url(${BACKEND_URL}/images/fondos/headeres/${backgroundImages['eficiencia y seguridad']})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2>Eficiencia y Seguridad</h2>
          <p>
            Mejoramos la eficiencia de las operaciones mineras y refineras a
            través de nuestras soluciones robustas que garantizan un entorno de
            trabajo seguro y confiable.
          </p>
        </section>

        <section
          id="nuevas-tecnologias"
          className="my-5"
          style={{
            backgroundImage: backgroundImages['nuevas tecnologías en equipos de vacío']
              ? `url(${BACKEND_URL}/images/fondos/headeres/${backgroundImages['nuevas tecnologías en equipos de vacío']})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2>Nuevas Tecnologías en Equipos de Vacío</h2>
          <p>
            Descubre las últimas tecnologías que están revolucionando el uso de
            equipos de vacío en minería y refinería, mejorando la eficiencia y
            reduciendo el impacto ambiental.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Refineria;
