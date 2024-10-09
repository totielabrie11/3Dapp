const fs = require('fs');
const path = require('path');

// Controlador para manejar la lógica de guardar y recuperar datos
const fotoTextController = {
  // Método POST para guardar o actualizar las descripciones
  save: (req, res) => {
    const dataPath = path.join(__dirname, '../data/fotoText.json');
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'El nombre y la descripción son requeridos.' });
    }

    try {
      let jsonData = [];

      // Verificar si el archivo ya existe y leerlo
      if (fs.existsSync(dataPath)) {
        const fileData = fs.readFileSync(dataPath);
        jsonData = JSON.parse(fileData);
      } else {
        // Crear el archivo si no existe
        fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
      }

      // Verificar si ya existe una entrada con el mismo nombre y reemplazarla
      const existingIndex = jsonData.findIndex(entry => entry.name === name);
      if (existingIndex !== -1) {
        jsonData[existingIndex].description = description;
      } else {
        jsonData.push({ name, description });
      }

      // Guardar los cambios en el archivo JSON
      fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
      return res.status(201).json({ message: 'Descripción guardada correctamente.' });
    } catch (error) {
      console.error('Error al guardar la descripción:', error);
      return res.status(500).json({ error: 'Error al guardar la descripción.' });
    }
  },

  // Método GET para obtener todas las descripciones guardadas
  getAll: (req, res) => {
    const dataPath = path.join(__dirname, '../data/fotoText.json');

    try {
      if (fs.existsSync(dataPath)) {
        const fileData = fs.readFileSync(dataPath);
        const jsonData = JSON.parse(fileData);
        return res.status(200).json(jsonData); // Devolver el contenido del archivo JSON
      } else {
        return res.status(404).json({ message: 'No se encontraron descripciones.' });
      }
    } catch (error) {
      console.error('Error al obtener las descripciones:', error);
      return res.status(500).json({ error: 'Error al obtener las descripciones.' });
    }
  }
};

module.exports = fotoTextController;
