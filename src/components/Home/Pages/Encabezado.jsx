import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACKEND_URL } from '../../configLocalHost'; // Asegúrate de tener la ruta correcta

function Encabezado({ backgroundImage }) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
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
            src={`${BACKEND_URL}/images/fondos/headeres/${backgroundImage}`} // Usar BACKEND_URL para la ruta de la imagen
            alt="Fondo Refineria"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
            onError={() =>
              console.error(
                'Error al cargar la imagen desde:',
                `${BACKEND_URL}/images/fondos/headeres/${backgroundImage}`
              )
            }
          />
        ) : (
          <p>Cargando imagen...</p>
        )}
      </div>

      {/* Texto del encabezado */}
      <div
        id="encabezado"
        className="container text-center"
        style={{ position: 'relative', zIndex: 1, paddingTop: '70px' }}
      >
        <h1 className="mb-4" style={{ color: '#fff' }}>
          Soluciones Robustas y Confiables para Minería y Refinería
        </h1>
        <p className="mb-5" style={{ color: '#fff' }}>
          Dosivac ofrece equipos de vacío que soportan ambientes rigurosos,
          mejorando la eficiencia y seguridad en las operaciones mineras.
        </p>
      </div>
    </div>
  );
}

export default Encabezado;
