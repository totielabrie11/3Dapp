const express = require('express'); // Asegúrate de requerir express
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const fs = require('fs');
const path = require('path');

const router = express.Router(); // Aquí defines el router

const getSectionsFromPages = () => {
  const pagesDirectory = path.join(__dirname, '..', 'src', 'components', 'Home', 'Pages'); // Directorio donde están los archivos JSX
  const sectionData = [];

  console.log(`Escaneando el directorio: ${pagesDirectory}`);

  if (fs.existsSync(pagesDirectory)) {
    const files = fs.readdirSync(pagesDirectory);
    console.log(`Archivos encontrados en el directorio: ${files}`);

    files.forEach((file) => {
      if (file.endsWith('.jsx')) {
        const filePath = path.join(pagesDirectory, file);
        console.log(`Leyendo archivo JSX: ${filePath}`);

        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Usar @babel/parser para analizar el código JSX
        const ast = babelParser.parse(fileContent, {
          sourceType: 'module',
          plugins: ['jsx'], // Habilitar el análisis de JSX
        });

        // Usar babel-traverse para encontrar las etiquetas <section>
        traverse(ast, {
          JSXElement(path) {
            const nodeName = path.node.openingElement.name.name;
            if (nodeName === 'section') {
              const attributes = path.node.openingElement.attributes;
              let id = null;
              let name = null;

              // Buscar el atributo 'id' y el texto del título (h2) dentro de la etiqueta <section>
              attributes.forEach((attr) => {
                if (attr.name && attr.name.name === 'id') {
                  id = attr.value.value; // Obtener el valor del id
                }
              });

              // Buscar el texto dentro de la etiqueta <h2> dentro de la sección
              path.node.children.forEach((child) => {
                if (child.type === 'JSXElement' && child.openingElement.name.name === 'h2') {
                  name = child.children[0].value; // El texto dentro del <h2>
                }
              });

              if (id && name) {
                sectionData.push({ id, name, page: file.replace('.jsx', '') });
                console.log(`Sección encontrada: ID = ${id}, Nombre = ${name}, Página = ${file.replace('.jsx', '')}`);
              }
            }
          }
        });
      } else {
        console.log(`Archivo ignorado (no es JSX): ${file}`);
      }
    });
  } else {
    console.error(`Directorio no encontrado: ${pagesDirectory}`);
  }

  console.log('Secciones recopiladas:', sectionData);

  return sectionData;
};

// Endpoint para obtener las secciones de las páginas
router.get('/api/pages/sections', (req, res) => {
  const sections = getSectionsFromPages();
  console.log('Enviando secciones al frontend:', sections);
  res.json({ sections });
});

module.exports = router; // Exporta el router
