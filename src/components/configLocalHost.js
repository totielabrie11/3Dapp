const getBackendUrl = () => {
  // Obtenemos el hostname actual del navegador
  const hostname = window.location.hostname;

  // Verificamos si el usuario está accediendo desde localhost o una IP local (127.0.0.1)
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // Determinamos la URL del backend según si es un entorno local o externo
  const BACKEND_URL = isLocalhost
    ? process.env.REACT_APP_BACKEND_URL_DEV  // Usar la variable de entorno en desarrollo
    : process.env.REACT_APP_BACKEND_URL_PROD;  // Usar la variable de entorno en producción

  // Imprimir la URL final para debug
  console.log("🚀 ~ BACKEND_URL:", BACKEND_URL);

  // Construimos la URL de la API (agregando el prefijo '/api/v1')
  const apiURL = `${BACKEND_URL}/api/v1`;

  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', apiURL);

  // Retornamos la URL del backend
  return apiURL;
};

// Exportamos la URL correcta del backend para usar en otros componentes
export const BACKEND_URL = getBackendUrl();
