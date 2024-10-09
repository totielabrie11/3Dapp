import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function TextFotoEditor({ show, handleClose, selectedPhoto, handleSave }) {
  const [description, setDescription] = useState('');

  const handleSaveClick = () => {
    if (selectedPhoto) {
      handleSave(description);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Descripción a {selectedPhoto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="photoDescription" className="form-label">Descripción:</label>
          <input
            id="photoDescription"
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej. Hermoso atardecer en la playa"
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TextFotoEditor;