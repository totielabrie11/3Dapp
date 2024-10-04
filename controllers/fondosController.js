// fondoController.js
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const express = require('express');
const router = express.Router();

// Directorio donde se almacenan los fondos de pantalla
const fondosDir = path.join(__dirname, '..', 'public', 'images', 'fondos');

// Verificar si el directorio 'public/images/fondos' existe. Si no existe, crearlo.
if (!fs.existsSync(fondosDir)) {
  fs.mkdirSync(fondosDir, { recursive: true });
}

// Configuración de multer para subir fondos a public/images/fondos
const storageFondos = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fondosDir); // Carpeta donde se almacenan los fondos
  },
  filename: (req, file, cb) => {
    const userFilename = req.body.name ? req.body.name : Date.now().toString(); // Usar el nombre proporcionado o timestamp
    cb(null, userFilename + path.extname(file.originalname)); // Guardar archivo con el nombre proporcionado
  }
});

const uploadFondos = multer({ storage: storageFondos });

// Endpoint para obtener la lista de fondos
router.get('/api/fondos', (req, res) => {
  fs.readdir(fondosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al leer el directorio de fondos' });
    }
    const fondos = files.map(file => ({
      name: file,
      url: `/images/fondos/${file}`
    }));
    res.json({ success: true, fondos });
  });
});

// Endpoint para subir un nuevo fondo
router.post('/api/fondos/upload', uploadFondos.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No se ha subido ninguna imagen' });
  }
  res.json({ success: true, message: 'Fondo subido con éxito', url: `/images/fondos/${req.file.filename}` });
});

// Endpoint para eliminar un fondo
router.delete('/api/fondos/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(fondosDir, filename);

  fs.unlink(filePath, (err) => {
    if (err && err.code === 'ENOENT') {
      return res.status(404).json({ success: false, message: 'Fondo no encontrado' });
    } else if (err) {
      return res.status(500).json({ success: false, message: 'Error al eliminar el fondo', error: err });
    }

    res.json({ success: true, message: 'Fondo eliminado con éxito' });
  });
});

router.put('/api/fondos/:filename', uploadFondos.single('image'), (req, res) => {
  const currentFilename = req.params.filename;  // Nombre del fondo que se va a modificar
  const newFilename = req.body.name;  // Nuevo nombre del fondo

  // Extraer la extensión del archivo original
  const originalExtension = path.extname(currentFilename);  // Obtiene la extensión original (e.g., ".jpg")

  // Validar que se proporcione un nuevo nombre
  if (!newFilename) {
    return res.status(400).json({ success: false, message: 'Debes proporcionar un nuevo nombre.' });
  }

  // Ruta actual del archivo
  const currentFilePath = path.join(fondosDir, currentFilename);

  // Construir la nueva ruta con el nuevo nombre y la misma extensión
  const newFilePath = path.join(fondosDir, newFilename + originalExtension);

  // Si se subió un nuevo archivo, primero eliminamos el archivo anterior y guardamos el nuevo
  if (req.file) {
    fs.unlink(currentFilePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        return res.status(500).json({ success: false, message: 'Error al eliminar el fondo existente.', error: err });
      }

      // Guardar el nuevo archivo con el nuevo nombre (usando la extensión del archivo subido)
      fs.rename(req.file.path, newFilePath, (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error al guardar el nuevo archivo.', error: err });
        }

        res.json({ success: true, message: 'Fondo y archivo modificados con éxito.', url: `/images/fondos/${newFilename}${originalExtension}` });
      });
    });
  } else {
    // Si no hay un nuevo archivo, solo renombramos el archivo existente, conservando la extensión original
    fs.rename(currentFilePath, newFilePath, (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.status(404).json({ success: false, message: 'Fondo no encontrado.' });
        }
        return res.status(500).json({ success: false, message: 'Error al renombrar el fondo.', error: err });
      }

      res.json({ success: true, message: 'Fondo renombrado con éxito.', url: `/images/fondos/${newFilename}${originalExtension}` });
    });
  }
});



module.exports = router;
