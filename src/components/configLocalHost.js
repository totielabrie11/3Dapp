const getBackendUrl = () => {
  // Verifica si estás en localhost
  const isLocalhost = window.location.hostname === 'localhost';

  // Determina la URL del backend según el entorno
  const BACKEND_URL = isLocalhost 
    ? 'http://localhost:3005'
    : 'http://dosivac.homeip.net:3005';

  console.log("🚀 ~ BACKEND_URL:", BACKEND_URL);

  // Construye la URL de la API
  const apiURL = `${BACKEND_URL}/api/v1`;

  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', apiURL);

  // Retorna la URL del backend
  return BACKEND_URL;
};

// Exporta la URL correcta del backend
export const BACKEND_URL = getBackendUrl();
