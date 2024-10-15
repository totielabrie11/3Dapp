const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const PAGES_DIR = path.join(__dirname, '..', 'src', 'components', 'Home', 'Pages');
const ASSIGNMENTS_FILE = path.join(__dirname, '..', 'data', 'pageAssignments.json');

// Verificar si el archivo `pageAssignments.json` existe, si no, crearlo con un contenido vacío
if (!fs.existsSync(ASSIGNMENTS_FILE)) {
  fs.writeFileSync(ASSIGNMENTS_FILE, JSON.stringify({ aplicarPaginas: {} }));
}

// Endpoint para obtener las páginas existentes
router.get('/api/pages', (req, res) => {
  fs.readdir(PAGES_DIR, (err, files) => {
    if (err) {
      console.error('Error al leer las páginas en la ruta:', PAGES_DIR, err);
      return res.status(500).json({ message: 'Error al leer las páginas.' });
    }

    const pages = files
      .filter(file => file.endsWith('.jsx'))
      .map(file => file.replace('.jsx', ''));  // Remueve la extensión .jsx

    res.json({ pages });
  });
});

router.post('/api/pages/assign-multiple', (req, res) => {
  const { photoName, pageName, section } = req.body;

  if (!photoName || !pageName || !section) {
    return res.status(400).json({ message: 'Faltan parámetros.' });
  }

  // Leer el archivo de asignaciones
  fs.readFile(ASSIGNMENTS_FILE, 'utf8', (err, data) => {
    let assignments = { aplicarPaginas: {} }; // Inicializamos "aplicarPaginas" correctamente

    if (!err && data) {
      try {
        assignments = JSON.parse(data);  // Parseamos el archivo existente si existe
      } catch (parseErr) {
        console.error('Error al parsear el archivo de asignaciones:', parseErr);
        return res.status(500).json({ message: 'Error al procesar las asignaciones.' });
      }
    }

    // Asegurarse de que "aplicarPaginas" está bien inicializado
    if (!assignments.aplicarPaginas) {
      assignments.aplicarPaginas = {};
    }

    // Asegurarse de que la página (pageName) esté inicializada como un array dentro de "aplicarPaginas"
    if (!assignments.aplicarPaginas[pageName]) {
      assignments.aplicarPaginas[pageName] = [];
    }

    // Verificar si ya existe una asignación para la misma sección y reemplazarla si es necesario
    const existingIndex = assignments.aplicarPaginas[pageName].findIndex(
      assignment => assignment.section === section
    );

    if (existingIndex !== -1) {
      // Reemplazar la asignación existente para esa sección
      assignments.aplicarPaginas[pageName][existingIndex] = { section, photoName };
    } else {
      // Añadir una nueva asignación si no existe para esa sección
      assignments.aplicarPaginas[pageName].push({ section, photoName });
    }

    // Guardar las nuevas asignaciones en el archivo JSON
    fs.writeFile(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar la asignación:', err);
        return res.status(500).json({ message: 'Error al guardar la asignación.' });
      }

      res.json({
        success: true,
        message: `Fondo ${photoName} asignado a la página ${pageName} en la sección ${section}.`
      });
    });
  });
});



// Endpoint para obtener el fondo de pantalla asignado a una página
router.get('/api/pages/:pageName/fondo', (req, res) => {
  const { pageName } = req.params;

  fs.readFile(ASSIGNMENTS_FILE, 'utf8', (err, data) => {
    if (err || !data) {
      console.error('Error al leer el archivo de asignaciones:', err);
      return res.status(404).json({ message: 'No se encontró ninguna asignación.' });
    }

    let assignments;
    try {
      assignments = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error al parsear el archivo de asignaciones:', parseErr);
      return res.status(500).json({ message: 'Error al procesar las asignaciones.' });
    }

    if (!assignments.aplicarPaginas[pageName]) {
      return res.status(404).json({ message: 'No se encontró ninguna asignación para esta página.' });
    }

    res.json({ fondo: assignments.aplicarPaginas[pageName] });
  });
});

// Endpoint para eliminar la asignación de fondo de pantalla de una página
router.delete('/api/pages/:pageName/fondo', (req, res) => {
  const { pageName } = req.params;

  fs.readFile(ASSIGNMENTS_FILE, 'utf8', (err, data) => {
    if (err || !data) {
      console.error('Error al leer el archivo de asignaciones:', err);
      return res.status(404).json({ message: 'No se encontró ninguna asignación.' });
    }

    let assignments;
    try {
      assignments = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error al parsear el archivo de asignaciones:', parseErr);
      return res.status(500).json({ message: 'Error al procesar las asignaciones.' });
    }

    if (!assignments.aplicarPaginas[pageName]) {
      return res.status(404).json({ message: 'No se encontró ninguna asignación para esta página.' });
    }

    delete assignments.aplicarPaginas[pageName];

    fs.writeFile(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2), (err) => {
      if (err) {
        console.error('Error al eliminar la asignación:', err);
        return res.status(500).json({ message: 'Error al eliminar la asignación.' });
      }

      res.json({ success: true, message: `La asignación del fondo para la página ${pageName} fue eliminada.` });
    });
  });
});

module.exports = router;