const getBackendUrl = () => {
  const hostname = window.location.hostname;
  console.log('Hostname actual:', hostname); // Para verificar el hostname actual

  const isLocalhost = ['localhost', '127.0.0.1', '::1'].includes(hostname);
  
  // Verifica si la variable de entorno está definida
  const prodUrl = process.env.REACT_APP_BACKEND_URL_PROD || 'http://dosivac.homeip.net:3005';

  if (!process.env.REACT_APP_BACKEND_URL_PROD) {
    console.warn('Advertencia: REACT_APP_BACKEND_URL_PROD no está definida. Usando valor por defecto:', prodUrl);
  }

  console.log('REACT_APP_BACKEND_URL_PROD:', prodUrl);
  console.log('isLocalhost:', isLocalhost);

  // Devuelve la URL correcta dependiendo si es localhost o no
  return isLocalhost ? 'http://localhost:3005' : prodUrl;
};

export const BACKEND_URL = getBackendUrl();
