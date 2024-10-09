import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function TextFotoEditor({ show, handleClose, selectedPhoto, handleSave }) {
  const [description, setDescription] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
  const [fontColor, setFontColor] = useState('#000000');
  const [textTransform, setTextTransform] = useState('none');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [backgroundOpacity, setBackgroundOpacity] = useState(0.7);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoTextDetails = async () => {
      if (selectedPhoto) {
        try {
          const response = await axios.get('/api/fotoText');
          const photoData = response.data.find(photo => photo.name === selectedPhoto.name);
          if (photoData) {
            setDescription(photoData.description);
            setFontFamily(photoData.fontFamily);
            setFontColor(photoData.fontColor);
            setTextTransform(photoData.textTransform);
            if (photoData.backgroundColor) {
              const rgbaMatch = photoData.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
              if (rgbaMatch) {
                const [, r, g, b, a] = rgbaMatch;
                setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
                setBackgroundOpacity(parseFloat(a));
              } else {
                setBackgroundColor('#000000');
                setBackgroundOpacity(0.7);
              }
            }
          }
        } catch (error) {
          console.error('Error al obtener los detalles de la foto:', error);
          setError('Error al obtener los detalles de la foto.');
        }
      }
    };
    fetchPhotoTextDetails();
  }, [selectedPhoto]);

  const handleSaveClick = () => {
    if (selectedPhoto) {
      // Parsear el valor de backgroundColor para crear una cadena de color rgba
      const r = parseInt(backgroundColor.slice(1, 3), 16) || 0;
      const g = parseInt(backgroundColor.slice(3, 5), 16) || 0;
      const b = parseInt(backgroundColor.slice(5, 7), 16) || 0;
      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${backgroundOpacity})`;

      handleSave({ description, fontFamily, fontColor, textTransform, backgroundColor: rgbaColor });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Descripción a {selectedPhoto.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
        <div className="mb-3">
          <label htmlFor="fontSelector" className="form-label">Seleccionar tipo de letra:</label>
          <Form.Select
            id="fontSelector"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="Verdana, sans-serif">Verdana</option>
            <option value="Helvetica, sans-serif">Helvetica</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
            <option value="Tahoma, sans-serif">Tahoma</option>
            <option value="Lucida Console, monospace">Lucida Console</option>
            <option value="Palatino Linotype, serif">Palatino Linotype</option>
            <option value="Impact, sans-serif">Impact</option>
            <option value="Gill Sans, sans-serif">Gill Sans</option>
            <option value="Century Gothic, sans-serif">Century Gothic</option>
            <option value="Comic Sans MS, cursive">Comic Sans MS</option>
            <option value="Franklin Gothic Medium, sans-serif">Franklin Gothic Medium</option>
          </Form.Select>
        </div>
        <div className="mb-3">
          <label htmlFor="fontColor" className="form-label">Seleccionar color de letra:</label>
          <input
            id="fontColor"
            type="color"
            className="form-control"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="textTransform" className="form-label">Transformación del texto:</label>
          <Form.Select
            id="textTransform"
            value={textTransform}
            onChange={(e) => setTextTransform(e.target.value)}
          >
            <option value="none">Sin modificar</option>
            <option value="uppercase">Mayúsculas</option>
            <option value="lowercase">Minúsculas</option>
          </Form.Select>
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundColor" className="form-label">Seleccionar color de fondo:</label>
          <input
            id="backgroundColor"
            type="color"
            className="form-control"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="backgroundOpacity" className="form-label">Seleccionar opacidad del fondo:</label>
          <input
            id="backgroundOpacity"
            type="range"
            className="form-control"
            min="0"
            max="1"
            step="0.1"
            value={backgroundOpacity}
            onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
          />
        </div>
        <div style={{ marginTop: '10px', fontFamily: fontFamily, color: fontColor, textTransform: textTransform, backgroundColor: `rgba(${parseInt(backgroundColor.slice(1, 3), 16) || 0}, ${parseInt(backgroundColor.slice(3, 5), 16) || 0}, ${parseInt(backgroundColor.slice(5, 7), 16) || 0}, ${backgroundOpacity})` }}>
          Ejemplo de texto con la fuente, color, fondo y transformación seleccionados
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
