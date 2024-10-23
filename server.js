import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Cargar variables de entorno desde .env
dotenv.config();

// Obtener la ruta correcta para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware para servir archivos estáticos desde la carpeta 'build'
if (process.env.NODE_ENV === 'production') {
  // Servir los archivos estáticos de React desde la carpeta 'build'
  app.use(express.static(path.join(__dirname, 'build')));

  // Para cualquier ruta que no coincida con un archivo estático, devuelve el index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // Si estás en desarrollo, puedes devolver algún mensaje o manejar otras rutas
  app.get('/', (req, res) => {
    res.send('Servidor en modo desarrollo. Para producción, asegúrate de generar el build del frontend.');
  });
}

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
