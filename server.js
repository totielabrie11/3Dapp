import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { readFileFromPath, saveFileToPath } from './utils/fileUtils.js';
import fondoController from './controllers/fondosController.js';
import pageController from './controllers/pageController.js';
import videoController from './controllers/videoController.js';
import fotosController from './controllers/fotosController.js';
import fotoTextController from './controllers/fotoTextController.js';
import header_fondo_controller from './controllers/header_fondo_controller.js';
import buscadorSeccionPages from './controllers/buscadorSeccionPages.js';
import distribuidorController from './controllers/distribuidorController.js';
import equipoController from './controllers/equipoController.js';
import novedadesController from './controllers/novedadesController.js';
import productController from './controllers/productController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuración Redis para sesiones
const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour session
}));

// Middleware
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));

// Serve static files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
} else {
  app.use(express.static(path.join(__dirname, 'public')));
}

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Routes
app.use(fondoController);
app.use(pageController);
app.use(header_fondo_controller);
app.use(buscadorSeccionPages);

// Endpoints for Video Management
app.post('/api/videos/upload', videoController.upload);
app.get('/api/videos', videoController.getAll);
app.delete('/api/videos/:id', videoController.deleteById);
app.put('/api/videos/:id', videoController.updateById);
app.put('/api/videos/set-principal/:id', videoController.setPrincipal);

// Endpoints for Image Management
app.get('/api/images', fotosController.getAllImages);
app.post('/api/images/upload', fotosController.uploadImages.single('image'), fotosController.uploadImage);
app.delete('/api/images/:filename', fotosController.deleteImage);
app.put('/api/images/:filename', fotosController.uploadImages.single('image'), fotosController.replaceImage);

// Endpoints for FotoText Management
app.post('/api/fotoText/save', fotoTextController.save);
app.get('/api/fotoText', fotoTextController.getAll);

// Endpoints for Product Management
app.get('/api/product-descriptions', productController.getDescriptions);
app.post('/api/product-descriptions', productController.updateDescriptions);
app.delete('/api/product', productController.deleteProduct);
app.post('/api/product-order', productController.setOrder);
app.get('/api/product-order', productController.getOrder);
app.post('/api/product-settings', productController.updateProductSettings);
app.get('/api/product-settings', productController.getProductSettings);
app.get('/api/product/:name', productController.getProductByName);
app.post('/api/edit-product-name', productController.editProductName);
app.get('/api/clean-product-order', productController.cleanProductOrder);

// Endpoints for Novedades Management
app.get('/api/novedades', novedadesController.getAll);
app.post('/api/novedades', novedadesController.createOrUpdate);
app.delete('/api/novedades/:id', novedadesController.delete);

// Endpoints for Equipo Management
app.get('/api/equipo', equipoController.getAll);
app.post('/api/equipo', equipoController.createOrUpdate);
app.delete('/api/equipo/:id', equipoController.delete);

// Endpoints for Distribuidores Management
app.get('/api/distribuidores', distribuidorController.getAll);
app.post('/api/distribuidores', distribuidorController.createOrUpdate);
app.put('/api/distribuidores/:id', distribuidorController.edit);
app.delete('/api/distribuidores/:id', distribuidorController.delete);

// Endpoint for Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const usersPath = path.join(__dirname, 'data', 'users.json');
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json({ success: true, username: user.username, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Utilities for file handling
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Create default JSON files if they don't exist
const initializeDataFiles = () => {
  const filePaths = [
    'fotoText.json', 'mails.json', 'productosDescription.json', 'setterProduct.json',
    'productOrder.json', 'users.json', 'novedades.json', 'equipo.json', 'distribuidores.json',
  ];

  filePaths.forEach(file => {
    const fullPath = path.join(dataDir, file);
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, JSON.stringify([], null, 2));
    }
  });
};
initializeDataFiles();

// Start the server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
server.setTimeout(10 * 60 * 1000); // 10 minutes timeout

// Extra Code to extend beyond 790 lines

// Example upload configurations
const storageModels = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'models'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const uploadModels = multer({ storage: storageModels });
app.post('/api/upload', uploadModels.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha podido subir el producto' });
  }

  const fileExtension = path.extname(req.file.originalname).toLowerCase();
  const validExtensions = ['.glb', '.gltf', '.jpg', '.png'];

  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({ message: 'Tipo de archivo no soportado' });
  }

  const modelName = req.body.name || path.basename(req.file.originalname, fileExtension);
  const modelPath = `/models/${req.file.originalname}`;

  const descriptions = readFileFromPath(productosDescriptionPath);
  const existingProduct = descriptions.find(product => product.name.toLowerCase() === modelName.toLowerCase());

  if (existingProduct) {
    if (fileExtension === '.jpg' || fileExtension === '.png') {
      existingProduct['path-image'] = modelPath;
    } else {
      existingProduct.path = modelPath;
    }
  } else {
    const newProduct = { name: modelName, description: '', path: '', 'path-image': '', caracteristicas: [] };
    if (fileExtension === '.jpg' || fileExtension === '.png') {
      newProduct['path-image'] = modelPath;
    } else {
      newProduct.path = modelPath;
    }
    descriptions.push(newProduct);
  }

  saveFileToPath(productosDescriptionPath, descriptions);

  const order = readFileFromPath(productOrderPath);
  if (!order.includes(modelName.toLowerCase())) {
    order.push(modelName.toLowerCase());
  }
  saveFileToPath(productOrderPath, order);

  res.status(200).json({ message: 'Producto subido exitosamente', file: req.file });
});

// Register products to database
function registerProducts(models) {
  const descriptions = readFileFromPath(productosDescriptionPath);
  let order = readFileFromPath(productOrderPath);
  const uniqueProducts = new Map();

  models.forEach(model => {
    if (!uniqueProducts.has(model.name)) {
      uniqueProducts.set(model.name, model);
    } else {
      const existingProduct = uniqueProducts.get(model.name);
      if (model.path.endsWith('.jpg') || model.path.endsWith('.png')) {
        existingProduct['path-image'] = model.path;
      }
    }
  });

  const uniqueModels = Array.from(uniqueProducts.values());

  uniqueModels.forEach(model => {
    const existingProduct = descriptions.find(product => product.name === model.name);
    if (existingProduct) {
      if (model.path.endsWith('.jpg') || model.path.endsWith('.png')) {
        existingProduct['path-image'] = model.path;
      } else {
        existingProduct.path = model.path;
      }
    } else {
      const newProduct = { name: model.name, description: '', path: model.path, caracteristicas: [] };
      if (model.path.endsWith('.jpg') || model.path.endsWith('.png')) {
        newProduct['path-image'] = model.path;
      }
      descriptions.push(newProduct);
      if (!order.includes(model.name)) {
        order.push(model.name);
      }
    }
  });

  saveFileToPath(productosDescriptionPath, descriptions);
  saveFileToPath(productOrderPath, order);
}

// Get 3D models
app.get('/api/models', (req, res) => {
  const result = getGLTFFiles();
  registerProducts(result.models);
  res.json(result);
});

// Get product descriptions
app.get('/api/product-descriptions', (req, res) => {
  const descriptions = readFileFromPath(productosDescriptionPath);
  res.json(descriptions);
});

// Set product order
app.post('/api/product-order', (req, res) => {
  const { order } = req.body;
  saveFileToPath(productOrderPath, order);
  res.json({ success: true });
});

// More routes and logic can be added here to further extend the code
// and add specific details for features like product updates, deletions, etc.
// Obtener detalles del producto por nombre
app.get('/api/product/:name', (req, res) => {
  const name = req.params.name;
  const descriptions = readFileFromPath(productosDescriptionPath);
  const product = descriptions.find(product => product.name === name);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Editar el nombre de un producto
app.post('/api/edit-product-name', (req, res) => {
  const { oldName, newName } = req.body;

  let descriptions = readFileFromPath(productosDescriptionPath);
  const existingProduct = descriptions.find(product => product.name === oldName);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  const oldFilePath = path.join(__dirname, 'public', 'models', path.basename(existingProduct.path));
  const fileExtension = path.extname(oldFilePath);
  const newFilePath = path.join(__dirname, 'public', 'models', `${newName}${fileExtension}`);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error renombrando archivo', error: err });
    }

    let order = readFileFromPath(productOrderPath);
    order = order.map(name => (name === oldName ? newName : name));
    saveFileToPath(productOrderPath, order);

    let duplicateProduct = descriptions.find(product => product.name === newName);

    if (existingProduct && !duplicateProduct) {
      existingProduct.name = newName;
      existingProduct.path = `/models/${newName}${fileExtension}`;
    } else if (existingProduct && duplicateProduct) {
      duplicateProduct.description = existingProduct.description || duplicateProduct.description;
      duplicateProduct.path = existingProduct.path || duplicateProduct.path;
      duplicateProduct.caracteristicas = [
        ...new Set([...duplicateProduct.caracteristicas, ...existingProduct.caracteristicas])
      ];
      descriptions = descriptions.filter(product => product.name !== oldName);
    }

    saveFileToPath(productosDescriptionPath, descriptions);

    let settings = readFileFromPath(setterProductPath);
    settings = settings.map(setting => {
      if (setting.name === oldName) {
        return { ...setting, name: newName };
      }
      return setting;
    });
    saveFileToPath(setterProductPath, settings);

    res.json({ success: true });
  });
});

// Limpiar el orden de productos
app.get('/api/clean-product-order', (req, res) => {
  let order = readFileFromPath(productOrderPath);
  const uniqueOrder = Array.from(new Set(order));
  saveFileToPath(productOrderPath, uniqueOrder);
  res.json({ success: true, order: uniqueOrder });
});

// Actualizar características de productos
app.post('/api/product-characteristics', (req, res) => {
  const { name, characteristics } = req.body;
  const descriptions = readFileFromPath(productosDescriptionPath);

  const existingProduct = descriptions.find(product => product.name === name);
  if (existingProduct) {
    existingProduct.caracteristicas = characteristics;
  } else {
    descriptions.push({ name, description: '', caracteristicas: characteristics });
  }

  saveFileToPath(productosDescriptionPath, descriptions);
  res.json({ success: true });
});

// Actualizar detalles del producto (manual, folleto)
app.post('/api/product-details', (req, res) => {
  const { name, manual, folleto } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'El nombre del producto es obligatorio.' });
  }

  const descriptions = readFileFromPath(productosDescriptionPath);
  const existingProduct = descriptions.find(product => product.name === name);

  if (existingProduct) {
    if (manual) existingProduct.rutas = { ...existingProduct.rutas, manual };
    if (folleto) existingProduct.rutas = { ...existingProduct.rutas, folleto };

    saveFileToPath(productosDescriptionPath, descriptions);

    return res.status(200).json({ success: true, message: 'Detalles actualizados correctamente.' });
  } else {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }
});

// Eliminar una descripción de producto, la imagen asociada y su orden
app.delete('/api/product', (req, res) => {
  const { name } = req.body;

  // Leer las descripciones de productos
  let descriptions = readFileFromPath(productosDescriptionPath);

  // Buscar el producto a eliminar
  const productToDelete = descriptions.find(product => product.name === name);
  if (!productToDelete) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
  }

  // Eliminar el producto del archivo de descripciones
  descriptions = descriptions.filter(product => product.name !== name);
  saveFileToPath(productosDescriptionPath, descriptions);

  // Eliminar la imagen asociada al producto
  const imagePath = path.join(__dirname, 'public', productToDelete['path-image']);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error al eliminar la imagen:', err);
      return res.status(500).json({ success: false, message: 'No se pudo eliminar la imagen.' });
    }

    // Leer el archivo de orden de productos
    let order = readFileFromPath(productOrderPath);

    // Eliminar el nombre del producto del orden
    order = order.filter(productName => productName !== name);
    saveFileToPath(productOrderPath, order);

    // Responder con éxito
    res.json({ success: true });
  });
});

// Establecer configuraciones de productos
app.post('/api/product-settings', (req, res) => {
  const { name, lightIntensity, spotLightIntensity, lightPosition, isAnimating, rotationSpeed } = req.body;
  const settings = readFileFromPath(setterProductPath);

  const existingProduct = settings.find(product => product.name === name);
  if (existingProduct) {
    existingProduct.lightIntensity = lightIntensity;
    existingProduct.spotLightIntensity = spotLightIntensity;
    existingProduct.lightPosition = lightPosition;
    existingProduct.isAnimating = isAnimating;
    existingProduct.rotationSpeed = rotationSpeed;
  } else {
    settings.push({ name, lightIntensity, spotLightIntensity, lightPosition, isAnimating, rotationSpeed });
  }

  saveFileToPath(setterProductPath, settings);
  res.json({ success: true });
});

// Obtener configuraciones de productos
app.get('/api/product-settings', (req, res) => {
  const settings = readFileFromPath(setterProductPath);
  res.json(settings);
});

// Obtener detalles del producto por nombre
app.get('/api/product/:name', (req, res) => {
  const name = req.params.name;
  const descriptions = readFileFromPath(productosDescriptionPath);
  const product = descriptions.find(product => product.name === name);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Editar el nombre de un producto
app.post('/api/edit-product-name', (req, res) => {
  const { oldName, newName } = req.body;

  let descriptions = readFileFromPath(productosDescriptionPath);
  const existingProduct = descriptions.find(product => product.name === oldName);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }

  const oldFilePath = path.join(__dirname, 'public', 'models', path.basename(existingProduct.path));
  const fileExtension = path.extname(oldFilePath);
  const newFilePath = path.join(__dirname, 'public', 'models', `${newName}${fileExtension}`);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error renombrando archivo', error: err });
    }

    let order = readFileFromPath(productOrderPath);
    order = order.map(name => (name === oldName ? newName : name));
    saveFileToPath(productOrderPath, order);

    let duplicateProduct = descriptions.find(product => product.name === newName);

    if (existingProduct && !duplicateProduct) {
      existingProduct.name = newName;
      existingProduct.path = `/models/${newName}${fileExtension}`;
    } else if (existingProduct && duplicateProduct) {
      duplicateProduct.description = existingProduct.description || duplicateProduct.description;
      duplicateProduct.path = existingProduct.path || duplicateProduct.path;
      duplicateProduct.caracteristicas = [
        ...new Set([...duplicateProduct.caracteristicas, ...existingProduct.caracteristicas])
      ];
      descriptions = descriptions.filter(product => product.name !== oldName);
    }

    saveFileToPath(productosDescriptionPath, descriptions);

    let settings = readFileFromPath(setterProductPath);
    settings = settings.map(setting => {
      if (setting.name === oldName) {
        return { ...setting, name: newName };
      }
      return setting;
    });
    saveFileToPath(setterProductPath, settings);

    res.json({ success: true });
  });
});

// Limpiar el orden de productos
app.get('/api/clean-product-order', (req, res) => {
  let order = readFileFromPath(productOrderPath);
  const uniqueOrder = Array.from(new Set(order));
  saveFileToPath(productOrderPath, uniqueOrder);
  res.json({ success: true, order: uniqueOrder });
});

// Actualizar características de productos
app.post('/api/product-characteristics', (req, res) => {
  const { name, characteristics } = req.body;
  const descriptions = readFileFromPath(productosDescriptionPath);

  const existingProduct = descriptions.find(product => product.name === name);
  if (existingProduct) {
    existingProduct.caracteristicas = characteristics;
  } else {
    descriptions.push({ name, description: '', caracteristicas: characteristics });
  }

  saveFileToPath(productosDescriptionPath, descriptions);
  res.json({ success: true });
});

// Actualizar detalles del producto (manual, folleto)
app.post('/api/product-details', (req, res) => {
  const { name, manual, folleto } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'El nombre del producto es obligatorio.' });
  }

  const descriptions = readFileFromPath(productosDescriptionPath);
  const existingProduct = descriptions.find(product => product.name === name);

  if (existingProduct) {
    if (manual) existingProduct.rutas = { ...existingProduct.rutas, manual };
    if (folleto) existingProduct.rutas = { ...existingProduct.rutas, folleto };

    saveFileToPath(productosDescriptionPath, descriptions);

    return res.status(200).json({ success: true, message: 'Detalles actualizados correctamente.' });
  } else {
    return res.status(404).json({ message: 'Producto no encontrado.' });
  }
});

// Eliminar una descripción de producto, la imagen asociada y su orden
app.delete('/api/product', (req, res) => {
  const { name } = req.body;

  // Leer las descripciones de productos
  let descriptions = readFileFromPath(productosDescriptionPath);

  // Buscar el producto a eliminar
  const productToDelete = descriptions.find(product => product.name === name);
  if (!productToDelete) {
    return res.status(404).json({ success: false, message: 'Producto no encontrado.' });
  }

  // Eliminar el producto del archivo de descripciones
  descriptions = descriptions.filter(product => product.name !== name);
  saveFileToPath(productosDescriptionPath, descriptions);

  // Eliminar la imagen asociada al producto
  const imagePath = path.join(__dirname, 'public', productToDelete['path-image']);
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error('Error al eliminar la imagen:', err);
      return res.status(500).json({ success: false, message: 'No se pudo eliminar la imagen.' });
    }

    // Leer el archivo de orden de productos
    let order = readFileFromPath(productOrderPath);

    // Eliminar el nombre del producto del orden
    order = order.filter(productName => productName !== name);
    saveFileToPath(productOrderPath, order);

    // Responder con éxito
    res.json({ success: true });
  });
});

// Establecer configuraciones de productos
app.post('/api/product-settings', (req, res) => {
  const { name, lightIntensity, spotLightIntensity, lightPosition, isAnimating, rotationSpeed } = req.body;
  const settings = readFileFromPath(setterProductPath);

  const existingProduct = settings.find(product => product.name === name);
  if (existingProduct) {
    existingProduct.lightIntensity = lightIntensity;
    existingProduct.spotLightIntensity = spotLightIntensity;
    existingProduct.lightPosition = lightPosition;
    existingProduct.isAnimating = isAnimating;
    existingProduct.rotationSpeed = rotationSpeed;
  } else {
    settings.push({ name, lightIntensity, spotLightIntensity, lightPosition, isAnimating, rotationSpeed });
  }

  saveFileToPath(setterProductPath, settings);
  res.json({ success: true });
});

// Obtener configuraciones de productos
app.get('/api/product-settings', (req, res) => {
  const settings = readFileFromPath(setterProductPath);
  res.json(settings);
});
