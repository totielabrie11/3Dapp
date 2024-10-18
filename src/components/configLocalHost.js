const getBackendUrl = () => {
  // URL estática del backend
  const BACKEND_URL = 'http://dosivac.homeip.net:3005';

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
