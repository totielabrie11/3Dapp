import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoAdminAsignador from './VideoAdminAsignador'; // Componente para asignar videos a páginas

function VideoAdmin() {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState({ name: '', video: null });
  const [editingVideo, setEditingVideo] = useState(null); // Permitir la edición de videos
  const [error, setError] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);  // Controla el modal de asignación
  const [selectedVideo, setSelectedVideo] = useState(null);  // Almacena el video seleccionado para asignar

  // Cargar los videos desde el servidor
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/videos');
        setVideos(response.data.videos || []);
        setError(null);  // Limpiar cualquier error previo
      } catch (error) {
        console.error('Error al obtener los videos:', error);
        setError('Error al cargar los videos.');
      }
    };
    fetchVideos();
  }, []);

  // Maneja los cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      setNewVideo({ ...newVideo, video: files[0] });
    } else {
      setNewVideo({ ...newVideo, [name]: value });
    }
  };

  // Subir un nuevo video
  const handleAddVideo = async () => {
    if (!newVideo.name || !newVideo.video) {
      setError('Debes proporcionar un nombre y seleccionar un video.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newVideo.name);
      formData.append('video', newVideo.video);

      const response = await axios.post('/api/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedVideos = [...videos, { id: response.data.video.id, name: newVideo.name, url: response.data.video.url }];
      setVideos(updatedVideos);
      setNewVideo({ name: '', video: null });
      setError(null);
    } catch (error) {
      console.error('Error al agregar el video:', error);
      setError('Error al agregar el video.');
    }
  };

  // Editar un video existente
  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setNewVideo({ name: video.name, video: null });
  };

  // Guardar cambios de edición
  const handleSaveEdit = async () => {
    if (!newVideo.name) {
      setError('Debes proporcionar un nombre.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', newVideo.name);

      if (newVideo.video) {
        formData.append('video', newVideo.video);
      }

      const response = await axios.put(`/api/videos/${editingVideo.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const updatedVideos = videos.map((video) =>
        video.id === editingVideo.id
          ? { ...video, name: newVideo.name, url: response.data.video.url }
          : video
      );

      setVideos(updatedVideos);
      setEditingVideo(null);
      setNewVideo({ name: '', video: null });
      setError(null);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setError('Error al guardar los cambios.');
    }
  };

  // Eliminar un video
  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`/api/videos/${id}`);
      const updatedVideos = videos.filter(video => video.id !== id);
      setVideos(updatedVideos);
      setError(null);
    } catch (error) {
      console.error('Error al eliminar el video:', error);
      setError('Error al eliminar el video.');
    }
  };

  // Abrir el modal de asignación de video
  const handleAssign = (video) => {
    setSelectedVideo(video);
    setShowAssignModal(true);
  };

  // Cerrar el modal de asignación
  const handleAssignModalClose = () => {
    setShowAssignModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="container my-5">
      <h2>Administrar Videos</h2>

      {/* Muestra cualquier error */}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {/* Lista de videos existentes */}
      <h3>Videos Existentes:</h3>
      <ul className="list-group mb-4">
        {videos.length > 0 ? (
          videos.map(video => (
            <li key={video.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{video.name}</strong>
                <video
                  src={video.url}
                  controls
                  className="ms-3"
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <div>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditVideo(video)}  // Edita el video
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeleteVideo(video.id)}  // Elimina el video
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleAssign(video)}  // Asigna el video a una página
                >
                  Asignar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron videos.</li>
        )}
      </ul>

      {/* Formulario para agregar o editar un video */}
      <h3>{editingVideo ? 'Editar Video' : 'Agregar Nuevo Video'}</h3>
      <form onSubmit={e => e.preventDefault()}>
        <div className="mb-3">
          <label htmlFor="videoName" className="form-label">Nombre del Video:</label>
          <input
            id="videoName"
            type="text"
            className="form-control"
            name="name"
            value={newVideo.name}
            onChange={handleInputChange}
            placeholder="Ej. Video Promocional"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="videoFile" className="form-label">Subir Video:</label>
          <input
            id="videoFile"
            type="file"
            className="form-control"
            name="video"
            onChange={handleInputChange}
          />
        </div>
        {editingVideo ? (
          <button type="button" className="btn btn-success" onClick={handleSaveEdit}>
            Guardar Cambios
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={handleAddVideo}>
            Agregar Video
          </button>
        )}
        {editingVideo && (
          <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingVideo(null)}>
            Cancelar
          </button>
        )}
      </form>

      {/* Modal de asignación */}
      {selectedVideo && (
        <VideoAdminAsignador
          show={showAssignModal}
          handleClose={handleAssignModalClose}
          selectedVideo={selectedVideo}  // Pasar el video seleccionado al modal
        />
      )}
    </div>
  );
}

export default VideoAdmin;
