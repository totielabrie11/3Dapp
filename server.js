import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import session from 'express-session';

// Cargar variables de entorno desde .env
dotenv.config();

// Configurar __dirname para ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Configuración de tamaño límite para JSON
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora de duración de la sesión
}));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde la carpeta 'build' de React en producción
if (process.env.NODE_ENV === 'production') {
  // Servir los archivos estáticos de React
  app.use(express.static(path.join(__dirname, 'build')));

  // Para cualquier ruta que no coincida con un archivo estático, devolver index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  // Ruta para desarrollo, si es necesario
  app.get('/', (req, res) => {
    res.send('Servidor en modo desarrollo. Para producción, asegúrate de generar el build del frontend.');
  });
}

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
