import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Petroleo.css'

function Petroleo() {
  const [backgroundImages, setBackgroundImages] = useState({});

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get('/api/pages/assignments');
      const assignments = response.data;
      console.log('Asignaciones obtenidas del backend:', assignments);

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

      if (assignmentsByPage.Petroleo) {
        console.log('Trabajando con el array de la página Petroleo:', assignmentsByPage.Petroleo);

        const sectionImages = {};
        assignmentsByPage.Petroleo.forEach((assignment) => {
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
          <h1 className="mb-4" style={{ color: '#fff' }}>SOLUCIONES AVANZADAS PARA EL SECTOR OIL & GAS</h1>
          <p className="mb-5" style={{ color: '#fff' }}>
            En Dosivac, nos enorgullece ofrecer soluciones avanzadas y adaptables para el sector del petróleo y gas, combinando innovación tecnológica con un enfoque en eficiencia y confiabilidad. Nuestra gama de equipos dosificadores está diseñada para satisfacer una amplia variedad de necesidades y aplicaciones, desde sistemas alimentados por energía solar hasta opciones neumáticas y eléctricas de alta presión.
          </p>
        </div>
      </div>

      <section id="especializacion-sistemas" className="text-center" style={{
        backgroundImage: backgroundImages['especialización en sistemas de dosificación modulares'] 
          ? `url(/images/fondos/headeres/${backgroundImages['especialización en sistemas de dosificación modulares']})` 
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: backgroundImages['especialización en sistemas de dosificación modulares'] 
          ? 'transparent' 
          : '#0E0A0A', // Aplicar el color de fondo si no hay imagen
      }}>
        <h2 className="text-white">ESPECIALIZACIÓN EN SISTEMAS DE DOSIFICACIÓN MODULARES</h2>
        <p className="text-white">
          Dosivac se especializa en la fabricación de sistemas de dosificación modulares (skid) diseñados
          para aplicaciones industriales exigentes. Estos sistemas son fundamentales en la industria
          petrolera para la inyección precisa de químicos en diversos procesos, asegurando la precisión y
          confiabilidad necesarias en operaciones críticas.
        </p>

        <div className="d-flex justify-content-center equipo-container">
          <article className="equipo m-3 text-center" aria-label="Equipo Solar">
            <img src="assets/img/portfolio/eqsolar.png" alt="Equipos Solares" style={{ width: '400px', height: '400px', objectFit: 'contain' }} />
            <h3 className="text-white mt-3">EQUIPOS SOLARES</h3>
            <p>Dimensiones: 60 x 91</p>
            <p>Caudal máximo: 840 l/d</p>
            <p>Presión máxima: 650 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button className="contizar-btn" onClick={() => alert('Cotización solicitada')}>Cotizar</button>
          </article>

          <article className="equipo m-3 text-center" aria-label="Equipo Neumático">
            <img src="assets/img/portfolio/eq400.png" alt="Equipos Neumáticos" style={{ width: '400px', height: '400px', objectFit: 'contain' }} />
            <h3 className="text-white mt-3">EQUIPOS NEUMÁTICOS</h3>
            <p>Dimensiones: 60 x 91</p>
            <p>Caudal máximo: 600 l/d</p>
            <p>Presión máxima: 650 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button className="contizar-btn" onClick={() => alert('Cotización solicitada')}>Cotizar</button>
          </article>

          <article className="equipo m-3 text-center" aria-label="Equipo Electrónico">
            <img src="assets/img/portfolio/eq1000.png" alt="Equipos Electrónicos" style={{ width: '400px', height: '400px', objectFit: 'contain' }} />
            <h3 className="text-white mt-3">EQUIPOS ELECTRÓNICOS</h3>
            <p>Dimensiones: 76 x 100</p>
            <p>Caudal máximo: 5200 l/d</p>
            <p>Presión máxima: 200 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button className="contizar-btn" onClick={() => alert('Cotización solicitada')}>Cotizar</button>
          </article>
        </div>
      </section>

      <section
      id="tipo-de-bombas"
      className="tipo-de-bombas-section text-center"
      style={{
        backgroundImage: backgroundImages['tipo de bombas']
          ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(/images/fondos/headeres/${backgroundImages['tipo de bombas']})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '50px 20px',
        color: '#ffffff',
      }}
    >
      <div className="content-wrapper">
        <h2 className="section-title">APLICACIONES ESPECÍFICAS</h2>
        <p className="section-description">
          Inyección de Inhibidores de Corrosión: Protege equipos y tuberías de la
          corrosión, prolongando su vida útil.
        </p>
        <p className="section-description">
          Dosificación de Metanol: Previene la formación de hidratos en líneas de gas.
        </p>
        <p className="section-description">
          Control de pH y otros parámetros químicos: Esencial en procesos de tratamiento de
          agua y otros procesos industriales.
        </p>
        <p className="section-description">
          Inyección de Biocidas y otros agentes químicos: Controla el crecimiento de
          microorganismos en sistemas de enfriamiento y otros procesos.
        </p>

        <h3 className="sub-title mt-4">TIPOS DE BOMBAS</h3>
        <p className="section-description">
          Bombas Neumáticas (DEN, DENG): Alta capacidad de presión y bajo mantenimiento.
        </p>
        <p className="section-description">
          Bombas Eléctricas (DECI, DE, DE Duplex, DEAP): Robustas, adecuadas para servicio
          continuo en exteriores.
        </p>
        <p className="section-description">
          Bombas Solares (DES): Operación eficiente en áreas remotas sin energía eléctrica.
        </p>

        <button className="btn-ver-bombas">VER BOMBAS</button>
      </div>
    </section>

    <section
      id="componentes-dosificacion"
      className="componentes-dosificacion-section"
      style={{
        backgroundColor: '#0E0A0A',
        color: '#ffffff',
        padding: '50px 20px',
      }}
    >
      <div className="content-wrapper">
        <div className="columns">
          {/* Columna Izquierda - Componentes del Sistema */}
          <div className="column left">
            <h2 className="section-title">COMPONENTES DEL SISTEMA DE DOSIFICACIÓN</h2>
            <p><strong>Estructura Modular (Skid)</strong></p>
            <ul>
              <li>Material: Perfilería de acero soldada.</li>
              <li>Recubrimiento: Pintura antioxidio epoxi y poliuretano.</li>
            </ul>

            <p><strong>Sistema de Piping</strong></p>
            <ul>
              <li>Material: Acero inoxidable de alta calidad.</li>
              <li>Función: Transporte de químicos desde los tanques de almacenamiento hasta el punto de inyección.</li>
            </ul>

            <p><strong>Probeta de Calibración</strong></p>
            <ul>
              <li>Descripción: Tubo de vidrio con escala de doble graduación y filtro "Y".</li>
              <li>Función: Calibración precisa del sistema de dosificación.</li>
            </ul>

            <p><strong>Sistema de Válvulas</strong></p>
            <ul>
              <li>Descripción: Válvulas de bloqueo en la salida del tanque y la probeta.</li>
              <li>Función: Aislamiento de componentes para mantenimiento y calibración de la bomba.</li>
            </ul>

            <p><strong>Contenedor de Almacenaje</strong></p>
            <ul>
              <li>Material: Polietileno de alta densidad.</li>
              <li>Capacidades: 200, 400 y 1000 litros.</li>
              <li>Función: Almacenaje seguro de productos químicos con batea de seguridad para evitar derrames.</li>
            </ul>
          </div>

          {/* Columna Derecha - Características Destacadas */}
          <div className="column right">
            <h2 className="section-title">CARACTERÍSTICAS DESTACADAS</h2>
            <p><strong>Modularidad y versatilidad</strong></p>
            <p>Adaptabilidad: Los skids son fácilmente adaptables a diferentes aplicaciones y ubicaciones.</p>

            <p><strong>Eficiencia energética</strong></p>
            <p>Uso eficiente de recursos: Diseñados para minimizar el impacto ambiental.</p>

            <p><strong>Alta calidad y seguridad</strong></p>
            <p>Construcción de alta calidad: Fabricados bajo estrictos estándares de calidad, asegurando durabilidad y seguridad operativa.</p>

            <p><strong>Supervisión avanzada</strong></p>
            <p>Control preciso: Sistemas de control y monitoreo avanzados permiten una gestión eficiente del proceso de dosificación.</p>

            {/* Imagen justo debajo de Supervisión avanzada */}
            <div className="image-container-centered">
              <img
                src="assets/img/portfolio/6.png"
                alt="Imagen del sistema de dosificación"
                className="dosificacion-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
      
    <section
      id="control-supervision"
      className="control-supervision-section"
      style={{
        backgroundColor: '#0E0A0A',
        color: '#ffffff',
        padding: '50px 20px',
      }}
    >
      <div className="content-wrapper">
        {/* Contenedor del Título y Texto */}
        <div className="text-content">
          <h2 className="section-title">CONTROL Y SUPERVISIÓN</h2>
          <ul className="features-list">
            <li><strong>Tablero Metálico</strong>: Incluye guardamotor y botonera para arranque y parada del sistema.</li>
            <li><strong>Controlador DES</strong>: Sistema de regulación con display LCD para monitoreo y ajuste de parámetros.</li>
          </ul>
          <p className="description">
            <strong>TCMR (Módulo de Tele-supervisión y Control)</strong>: Permite el control local o remoto, monitoreando parámetros críticos como el nivel de tanque, caudal y presión.
          </p>
        </div>

        {/* Contenedor de las Imágenes */}
        <div className="images-content">
          <div className="main-image">
            <img
              src="assets/img/portfolio/7.png"
              alt="Sistema de dosificación"
              className="supervision-image"
            />
          </div>
          <div className="secondary-image">
            <img
              src="assets/img/portfolio/8.png"
              alt="Controlador TCMR-1"
              className="control-module-image"
            />
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}

export default Petroleo;
