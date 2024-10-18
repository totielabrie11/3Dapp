// configLocalHost.js
const getBackendUrl = () => {
  const isLocalhost = window.location.hostname === 'localhost';
  const prodUrl = process.env.REACT_APP_BACKEND_URL_PROD || 'http://dosivac.homeip.net:3005';
  
  console.log('REACT_APP_BACKEND_URL_PROD:', process.env.REACT_APP_BACKEND_URL_PROD || prodUrl);
  console.log('isLocalhost:', isLocalhost);

  return isLocalhost ? 'http://localhost:3005' : prodUrl;
};

export const BACKEND_URL = getBackendUrl();

  