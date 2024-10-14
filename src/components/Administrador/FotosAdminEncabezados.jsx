// FotosAdminEncabezados.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FotosAdminEncabezados({ onPhotosLoaded }) {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get('/api/encabezados');
        if (response.data.success) {
          setHeaders(response.data.headers);
          setError(null);
          if (onPhotosLoaded) {
            onPhotosLoaded(response.data.headers);
          }
        } else {
          setError('Error al cargar los encabezados.');
        }
      } catch (err) {
        console.error('Error al obtener los encabezados:', err);
        setError('Error al cargar los encabezados.');
      }
    };
    fetchHeaders();
  }, [onPhotosLoaded]);

  const handleDeleteHeader = async (filename) => {
    try {
      await axios.delete(`/api/encabezados/${filename}`);
      setHeaders(headers.filter(header => header.name !== filename));
      setError(null);  // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      setError('Error al eliminar la imagen.');
    }
  };

  return (
    <div>
      <h3>Administrar Fotos de Encabezados</h3>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <ul className="list-group">
        {headers.length > 0 ? (
          headers.map(header => (
            <li key={header.name} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{header.name}</strong>
                <img
                  src={header.url}
                  alt={header.name}
                  className="img-thumbnail ms-3"
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteHeader(header.name)}
              >
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron fotos de encabezados.</li>
        )}
      </ul>
    </div>
  );
}

export default FotosAdminEncabezados;