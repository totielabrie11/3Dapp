import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function FotosAdminAsignadorSeccion({ show, handleClose, onSave }) {
  const [selectedSection, setSelectedSection] = useState('encabezado');  // Valor por defecto

  const handleSave = () => {
    onSave(selectedSection);  // Enviar la sección seleccionada al componente padre
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona una Sección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSectionSelect">
            <Form.Label>Secciones disponibles</Form.Label>
            <Form.Control as="select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
              <option value="encabezado">Encabezado</option>
              <option value="otra-seccion">Otra Sección</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Seleccionar Sección
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FotosAdminAsignadorSeccion;
