// Controlador para gestionar recursos de páginas y secciones dinámicamente
const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const router = express.Router();

// Controlador para escanear archivos HTML y detectar las secciones
const getSectionsFromPages = () => {
  const pagesDirectory = path.join(__dirname, '..', 'src', 'components', 'Home', 'Pages'); // Directorio donde están los archivos HTML de las páginas
  const sectionData = [];

  if (fs.existsSync(pagesDirectory)) {
    fs.readdirSync(pagesDirectory).forEach((file) => {
      if (file.endsWith('.html')) {
        const filePath = path.join(pagesDirectory, file);
        const html = fs.readFileSync(filePath, 'utf-8');
        const $ = cheerio.load(html);

        $('section').each((i, section) => {
          const id = $(section).attr('id');
          const name = $(section).find('h2').text() || `Sección ${i + 1}`;
          if (id) {
            sectionData.push({ id, name, page: file.replace('.html', '') });
          }
        });
      }
    });
  } else {
    console.error(`Directorio no encontrado: ${pagesDirectory}`);
  }

  return sectionData;
};

// Endpoint para obtener las secciones de las páginas
router.get('/api/pages/sections', (req, res) => {
  const sections = getSectionsFromPages();
  res.json({ sections });
});

module.exports = router;