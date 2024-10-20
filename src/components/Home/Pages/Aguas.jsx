import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aguas.css';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL desde config.js
import Encabezado from './Encabezado'; // Importamos el componente Encabezado

function Aguas() {
  const [backgroundImages, setBackgroundImages] = useState({}); // Estado para las imágenes de fondo por sección
  const [sectionColors, setSectionColors] = useState({
    'equipos-portatiles': '',
    'sistemas-robustos': '',
    'beneficios-dosificacion': '',
    'equipo-dosificacion': '',
    'portable-equipment-section': '',
    'equipo-1000-litros': '',
    'equipo-200-litros': '',
    'seccion-prueba': '#123456' // Nueva sección con color imaginario
  });

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`);
      const assignments = response.data;

      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName } = assignment;
        if (!acc[pageName]) {
          acc[pageName] = [];
        }
        acc[pageName].push(assignment);
        return acc;
      }, {});

      if (assignmentsByPage.Aguas) {
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

  return (
    <div>
      {/* Componente Encabezado con imagen de fondo */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

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
                <div className="image-container">
                  <img src="assets/img/portfolio/equipoAguas1000.png" alt="equipoAguas1000" className="img-fluid" />
                </div>
              </div>
              <h3>Equipo de 1000 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 60 x 91</li>
                <li><strong>Caudal máximo:</strong> 840 l/d</li>
                <li><strong>Presión máxima:</strong> 650 kg/cm²</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
            <div className="col-md-6">
              <div className="equipo-image" id="equipo-200-img">
                <div className="image-container">
                  <img src="assets/img/portfolio/equipo200.jpg" alt="Equipo de 200 Litros" className="img-fluid" />
                </div>
              </div>
              <h3>Equipo de 200 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 76 x 100</li>
                <li><strong>Caudal máximo:</strong> 5200 l/d</li>
                <li><strong>Presión máxima:</strong> 200 kg/cm²</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
          </div>
        </div>
      </section>

      <section id="equipo-dosificacion" className="my-5 equipment-section" style={{
        backgroundColor: sectionColors['equipo-dosificacion'] || 'transparent',
        backgroundImage: backgroundImages['equipo de dosificacion'] ? `url(/images/fondos/headeres/${backgroundImages['equipo de dosificacion']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>EQUIPOS DE DOSIFICACIÓN</h2>
        <div className="equipment-block row">
          <div className="equipment col-md-6">
            <h3>EQUIPO DE 1000 LITROS</h3>
            <p>
              Nuestro equipo de 1000 litros está diseñado para operaciones de gran escala, proporcionando una solución robusta y confiable para la dosificación de fluidos. Este sistema incluye:
            </p>
            <ul>
              <li>Tablero Eléctrico: Disponible para equipos con bomba DECI/DDI.</li>
              <li>Probeta de Calibración: Con visualización de nivel para una calibración precisa.</li>
              <li>Válvulas de Maniobra: Facilitan el servicio del filtro y la probeta.</li>
              <li>Contenedor de 1000 Litros: Amplia capacidad para grandes volúmenes.</li>
              <li>Batea Contenedora Antiderrames: De 1100 litros, asegura que cualquier derrame sea contenido.</li>
              <li>Reja para Batea: Con puerta para vaciado eficiente.</li>
              <li>Sistema Anti Hurto: Protección adicional para la batea.</li>
              <li>Ganchos Sujeta Contenedor: Para una mayor estabilidad y seguridad.</li>
              <li>Acople Rápido: Facilita el reemplazo del contenedor.</li>
              <li>Skid Modular: Compacto y liviano para una fácil instalación.</li>
              <li>Gabinete Opcional: Para proteger la bomba.</li>
              <li>Peso: 280kg, dependiendo de la configuración.</li>
            </ul>
          </div>
          <div className="equipment col-md-6">
            <h3>EQUIPO DE 200 LITROS</h3>
            <p>
              El equipo de 200 litros es ideal para operaciones de menor escala que requieren la misma fiabilidad y precisión. Sus características incluyen:
            </p>
            <ul>
              <li>Tablero Eléctrico: Disponible para equipos con bomba DECI/DDI.</li>
              <li>Probeta de Calibración: Con visualización de nivel.</li>
              <li>Válvulas de Maniobra: Para el servicio del filtro y la probeta.</li>
              <li>Tanque de 200 Litros: Adecuado para volúmenes menores.</li>
              <li>Batea Contenedora Antiderrames: De 260 litros para máxima seguridad.</li>
              <li>Reja para Batea: Con puerta para vaciado.</li>
              <li>Sistema Anti Hurto: Protege la batea de posibles robos.</li>
              <li>Suncho Sujeta Tanque: Asegura el tanque firmemente.</li>
              <li>Skid Modular: Compacto y liviano.</li>
              <li>Gabinete Opcional: Para la protección de la bomba.</li>
              <li>Peso: 80kg, dependiendo de la configuración.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="equipos-portatiles" className="my-5 cloracion-equipment-section" style={{
        backgroundColor: sectionColors['equipos-portatiles'] || 'transparent',
        backgroundImage: backgroundImages['equipos-portatiles'] ? `url(/images/fondos/headeres/${backgroundImages['equipos-portatiles']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
        }}>
        <h2>SERIE AQUALINE - EQUIPOS DE CLORACIÓN</h2>
        <p>
          Una línea de equipos modulares para la dosificación, construidos enteramente en polietileno de media densidad (PEMD) de alta resistencia química, compatible con una amplia gama de los productos a dosificar.
        </p>
        <p>
          Diseño compacto y modular, de fácil instalación. Diseñados para nuestra línea de bombas EMD, EMD Plus y EMD Max. Posibilidad de realizar distintas configuraciones y de esta forma lograr dar solución a un sinfín de aplicaciones con el concepto “plug & play”.
        </p>
        <p>
          <strong>Aplicaciones:</strong> desinfección de agua potable en depuradoras, pozos de abastecimiento de agua residual, albercas, zonas rurales, entre otros. Tratamientos de agua de enfriamiento para inhibir el crecimiento biológico y control de algas. Cloración de agua potable en barrios, colegios, clubes, cooperativas, industria. Sistemas de tratamiento de agua en equipos de enfriamientos.
        </p>
        <p>
          El tanque está fabricado en material PEMD natural con boca de carga superior y puerto de venteo para gases de cloro. Opcional de 35, 50 y 90 litros. Probeta de acrílico incorporada con graduación para medición de caudal y visualización del nivel. Equipada con válvulas de doble vía para realizar maniobras de cubicado de la bomba y mantenimiento.
        </p>
      </section>

      <section id="seccion-prueba" className="my-5" style={{
        backgroundColor: sectionColors['seccion-prueba'],
        backgroundImage: backgroundImages['seccion-prueba'] ? `url(/images/fondos/headeres/${backgroundImages['seccion-prueba']})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <h2>Sección de Prueba</h2>
        <p>Esta es una sección de prueba con un color imaginario.</p>
      </section>
    </div>
  );
}

export default Aguas;
