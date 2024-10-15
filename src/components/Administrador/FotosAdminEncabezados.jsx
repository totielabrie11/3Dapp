import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FotosAdminAsignadorPaginas from './FotosAdminAsign/FotosAdminAsignadorPaginas';
import FotosAdminAsignadorSeccion from './FotosAdminAsign/FotosAdminAsignadorSeccion';

function FotosAdminEncabezados({ onPhotosLoaded, onAssign }) {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);
  const [showAssignPageModal, setShowAssignPageModal] = useState(false);  // Primer modal
  const [showAssignSectionModal, setShowAssignSectionModal] = useState(false);  // Segundo modal
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);  // Almacena la página seleccionada

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

  // Al abrir el primer modal (selección de página)
  const handleAssignHeader = (header) => {
    setSelectedHeader(header);
    setShowAssignPageModal(true);  // Muestra el modal para seleccionar página
  };

  // Cerrar los modales
  const handleAssignModalClose = () => {
    setShowAssignPageModal(false);
    setShowAssignSectionModal(false);
    setSelectedHeader(null);
    setSelectedPage(null);
  };

  // Manejo de guardar la página seleccionada y abrir el siguiente modal
  const handlePageSelected = (pageName) => {
    setSelectedPage(pageName);
    setShowAssignPageModal(false);
    setShowAssignSectionModal(true);  // Abre el segundo modal para seleccionar sección
  };

  // Guardar la asignación (página + sección + foto)
  const handleSaveAssignment = async (section) => {
    if (!selectedHeader || !selectedPage || !section) return;
    try {
      const endpoint = '/api/pages/assign-multiple';
      const data = {
        photoName: selectedHeader.name,
        pageName: selectedPage,
        section: section // Sección seleccionada en el segundo modal
      };

      await axios.post(endpoint, data);
      console.log(`Fondo ${selectedHeader.name} asignado a la página ${selectedPage} en la sección ${section}.`);
      handleAssignModalClose();
    } catch (error) {
      console.error('Error al guardar la asignación:', error);
      setError('Error al guardar la asignación.');
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
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeleteHeader(header.name)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleAssignHeader(header)}
                >
                  Asignar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron fotos de encabezados.</li>
        )}
      </ul>

      {/* Modal de selección de página */}
      {selectedHeader && (
        <FotosAdminAsignadorPaginas
          show={showAssignPageModal}
          handleClose={handleAssignModalClose}
          onSave={handlePageSelected}  // Enviar página seleccionada
        />
      )}

      {/* Modal de selección de sección */}
      {selectedPage && selectedHeader && (
        <FotosAdminAsignadorSeccion
          show={showAssignSectionModal}
          handleClose={handleAssignModalClose}
          onSave={handleSaveAssignment}  // Guardar página + sección + foto
        />
      )}
    </div>
  );
}

export default FotosAdminEncabezados;
