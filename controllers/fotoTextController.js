const fs = require('fs');
const path = require('path');

const fotoTextController = (req, res) => {

    
  const dataPath = path.join(__dirname, '../data/fotoText.json');
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'El nombre y la descripción son requeridos.' });
  }

  try {
    let jsonData = [];

    if (fs.existsSync(dataPath)) {
      const fileData = fs.readFileSync(dataPath);
      jsonData = JSON.parse(fileData);
    } else {
      // Crear el archivo y escribir un array vacío si no existe
      fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));
    }

    // Verificar si ya existe una entrada con el mismo nombre y reemplazarla
    const existingIndex = jsonData.findIndex(entry => entry.name === name);
    if (existingIndex !== -1) {
      jsonData[existingIndex].description = description;
    } else {
      jsonData.push({ name, description });
    }

    fs.writeFileSync(dataPath, JSON.stringify(jsonData, null, 2));

    return res.status(201).json({ message: 'Descripción guardada correctamente.' });
  } catch (error) {
    console.error('Error al guardar la descripción:', error);
    return res.status(500).json({ error: 'Error al guardar la descripción.' });
  }
};

module.exports = fotoTextController;