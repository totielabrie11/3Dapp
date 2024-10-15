import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function FotosAdminAsignadorSeccion({ show, handleClose, onSave }) {
  const [selectedSection, setSelectedSection] = useState('encabezado'); // Valor por defecto
  const [sections, setSections] = useState([]);

  // Función para obtener las secciones de las páginas desde el backend
  const fetchSections = useCallback(async () => {
    try {
      const response = await axios.get('/api/pages/sections'); // Suponiendo que este endpoint devuelve las secciones disponibles
      setSections(response.data.sections);
    } catch (error) {
      console.error('Error al obtener las secciones:', error);
    }
  }, []);

  // Cargar las secciones cuando se monte el componente
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  const handleSave = () => {
    onSave(selectedSection); // Enviar la sección seleccionada al componente padre
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
            <Form.Control
              as="select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              {sections.map((section) => (
                <option key={section.id} value={section.id}>{section.name}</option>
              ))}
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