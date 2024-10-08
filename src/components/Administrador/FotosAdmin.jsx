import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FotosAdminAsignador from './FotosAdminAsignador';
import TextFotoEditor from './TextFotoEditor';
import EditorFotografico from './EditorFotografico';

function FotosAdmin() {
  const [selectedSection, setSelectedSection] = useState('homeCarousel');
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({ name: '', image: null });
  const [error, setError] = useState(null);  // Estado para manejar errores
  const [showAssignModal, setShowAssignModal] = useState(false);  // Para controlar la visualización del modal
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);  // Para la foto seleccionada para asignar, descripción o edición

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const endpoint = selectedSection === 'fondos'
          ? '/api/fondos'
          : '/api/images';

        const response = await axios.get(endpoint);
        const fetchedPhotos = response.data.fondos || response.data.images || [];
        setPhotos(fetchedPhotos);
        setError(null);  // Limpiar cualquier error previo
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setError('Error al cargar las imágenes.');
        setPhotos([]);  // Limpiar fotos en caso de error
      }
    };
    fetchPhotos();
  }, [selectedSection]);

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewPhoto({ ...newPhoto, image: files[0] });
    } else {
      setNewPhoto({ ...newPhoto, [name]: value });
    }
  };

  const handleAddPhoto = async () => {
    if (!newPhoto.name || !newPhoto.image) {
      setError('Debes proporcionar un nombre y seleccionar una imagen.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newPhoto.name);
      formData.append('image', newPhoto.image);

      const endpoint = selectedSection === 'fondos'
        ? '/api/fondos/upload'
        : '/api/images/upload';

      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedPhotos = [...photos, { name: newPhoto.name, url: response.data.url }];
      setPhotos(updatedPhotos);
      setNewPhoto({ name: '', image: null });  // Limpiar el formulario
      setError(null);  // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al agregar la foto:', error);
      setError('Error al agregar la foto.');
    }
  };

  const handleDeletePhoto = async (filename) => {
    try {
      const endpoint = selectedSection === 'fondos'
        ? `/api/fondos/${filename}`
        : `/api/images/${filename}`;

      await axios.delete(endpoint);
      const updatedPhotos = photos.filter(photo => photo.name !== filename);
      setPhotos(updatedPhotos);
      setError(null);  // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      setError('Error al eliminar la imagen.');
    }
  };

  const handleAssign = (photo) => {
    setSelectedPhoto(photo);
    setShowAssignModal(true);
  };

  const handleAssignModalClose = () => {
    setShowAssignModal(false);
    setSelectedPhoto(null);
  };

  const handleDescription = (photo) => {
    setSelectedPhoto(photo);
    setShowDescriptionModal(true);
  };

  const handleDescriptionModalClose = () => {
    setShowDescriptionModal(false);
    setSelectedPhoto(null);
  };

  const handleSaveDescription = async ({ description, fontFamily, fontColor, textTransform, backgroundColor, pageName }) => {
    if (!selectedPhoto) return;
  
    try {
      const endpoint = '/api/fotoText/save';
      const data = {
        name: selectedPhoto.name,
        description,
        fontFamily,
        fontColor,
        textTransform,
        backgroundColor,
        pageName
      };
  
      await axios.post(endpoint, data);
      console.log('Descripción guardada correctamente');
    } catch (error) {
      console.error('Error al guardar la descripción:', error);
    }
    handleDescriptionModalClose();
  };

  const handleEditPhoto = (photo) => {
    setSelectedPhoto(photo);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setSelectedPhoto(null);
  };

  const handleSaveEdit = (updatedPhoto) => {
    const updatedPhotos = photos.map((photo) =>
      photo.name === selectedPhoto.name ? updatedPhoto : photo
    );
    setPhotos(updatedPhotos);
    handleEditModalClose();
  };

  return (
    <div className="container my-5">
      <h2>Administrar Fotografías</h2>

      {/* Muestra cualquier error */}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {/* Selección de sección */}
      <div className="mb-4">
        <label htmlFor="sectionSelect" className="form-label">Selecciona la sección:</label>
        <select
          id="sectionSelect"
          className="form-select"
          value={selectedSection}
          onChange={handleSectionChange}
        >
          <option value="homeCarousel">Carrusel de Inicio</option>
          <option value="gallery">Galería</option>
          <option value="fondos">Fondos de Pantalla</option>
        </select>
      </div>

      {/* Lista de fotos existentes en la sección seleccionada */}
      <h3>Fotos en {selectedSection === 'homeCarousel' ? 'Carrusel de Inicio' : selectedSection === 'gallery' ? 'Galería' : 'Fondos de Pantalla'}:</h3>
      <ul className="list-group mb-4">
        {photos.length > 0 ? (
          photos.map(photo => (
            <li key={photo.name} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{photo.name}</strong>
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="img-thumbnail ms-3"
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeletePhoto(photo.name)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleAssign(photo)}
                >
                  Asignar
                </button>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() => handleDescription(photo)}
                >
                  Descripción
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEditPhoto(photo)}
                >
                  Editar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron fotos en esta sección.</li>
        )}
      </ul>

      {/* Formulario para agregar nueva foto */}
      <div className="mb-4">
        <h4>Agregar nueva foto</h4>
        <div className="mb-3">
          <label htmlFor="photoName" className="form-label">Nombre de la foto:</label>
          <input
            type="text"
            id="photoName"
            name="name"
            className="form-control"
            value={newPhoto.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photoImage" className="form-label">Seleccionar imagen:</label>
          <input
            type="file"
            id="photoImage"
            name="image"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddPhoto}>Agregar Foto</button>
      </div>

      {/* Modal de asignación */}
      {selectedPhoto && (
        <FotosAdminAsignador
          show={showAssignModal}
          handleClose={handleAssignModalClose}
          selectedPhoto={selectedPhoto}
        />
      )}

      {/* Modal de descripción */}
      {selectedPhoto && (
        <TextFotoEditor
          show={showDescriptionModal}
          handleClose={handleDescriptionModalClose}
          selectedPhoto={selectedPhoto}
          handleSave={handleSaveDescription}
        />
      )}

      {/* Modal de edición */}
      {selectedPhoto && (
        <EditorFotografico
          show={showEditModal}
          handleClose={handleEditModalClose}
          selectedPhoto={selectedPhoto}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default FotosAdmin;