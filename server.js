import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import dotenv from 'dotenv';
import session from 'express-session';
import getGLTFFiles from './scripts/getModels.js';
import { upload, enviarCorreo } from './controllers/emailHandler.js';
import fondoController from './controllers/fondosController.js';
import pageController from './controllers/pageController.js';
import videoController from './controllers/videoController.js';
import fotosController from './controllers/fotosController.js';
import fotoTextController from './controllers/fotoTextController.js';
import header_fondo_controller from './controllers/header_fondo_controller.js';
import buscadorSeccionPages from './controllers/buscadorSeccionPages.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración de tamaño límite para JSON
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Configuración de sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hora de duración de la sesión
}));

// Usar controladores
app.use(fondoController);
app.use(pageController);
app.use(header_fondo_controller);
app.use(buscadorSeccionPages);

// Rutas para videos
app.post('/api/videos/upload', videoController.upload);
app.get('/api/videos', videoController.getAll);
app.delete('/api/videos/:id', videoController.deleteById);
app.put('/api/videos/:id', videoController.updateById);
app.put('/api/videos/set-principal/:id', videoController.setPrincipal);

// Rutas para imágenes
app.get('/api/images', fotosController.getAllImages);
app.post('/api/images/upload', fotosController.uploadImages.single('image'), fotosController.uploadImage);
app.delete('/api/images/:filename', fotosController.deleteImage);
app.put('/api/images/:filename', fotosController.uploadImages.single('image'), fotosController.replaceImage);

// Rutas para foto y texto
app.post('/api/fotoText/save', fotoTextController.save); 
app.get('/api/fotoText', fotoTextController.getAll);  

// Servir archivos estáticos del frontend compilado
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Para cualquier ruta, servir el archivo 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Escuchar en 0.0.0.0 para que Render pueda acceder
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

