// SubscriptionNewsLatter.jsx
import React from 'react';

const SubscriptionNewsLatter = () => {
  return (
    <footer className="footer py-4" style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, width: '100%' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 text-lg-start" style={{ color: '#333' }}>Copyright &copy; Tu Sitio 2024</div>
          <div className="col-lg-4 my-3 my-lg-0">
            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <div className="col-lg-4 text-lg-end">
            <a className="link-dark text-decoration-none me-3" style={{ color: '#333' }} href="#!">Política de Privacidad</a>
            <a className="link-dark text-decoration-none" style={{ color: '#333' }} href="#!">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SubscriptionNewsLatter;
