import './Footer.css'; // Asegúrate de enlazar el CSS correcto para los estilos

const Footer = () => {
  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row">
          {/* Certificaciones */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Certificaciones</h2>
              <div className="certificaciones">
                <img src="assets/img/logos/iso 9001.png" alt="ISO 9001" />
                <img src="assets/img/logos/iso 14001.png" alt="ISO 14001" />
              </div>
            </section>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Enlaces rápidos</h2>
              <ul className="divided">
                <li><a href="/" onClick={(e) => e.preventDefault()}>Soporte técnico</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Sustentabilidad</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Manuales</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Capacitación</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Distribuidores</a></li>
              </ul>
            </section>
          </div>

          {/* Contacto */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Contacto</h2>
              <p>Dirección: Rivadavia 5945, Loma Hermosa, Provincia de Buenos Aires</p>
              <p>Teléfono: 011 2143-2864</p>
              <h3>Redes sociales</h3>
              <div className="social-icons">
                <a href="/" onClick={(e) => e.preventDefault()}><i className="icon-instagram"></i></a>
                <a href="/" onClick={(e) => e.preventDefault()}><i className="icon-youtube"></i></a>
                <a href="/" onClick={(e) => e.preventDefault()}><i className="icon-whatsapp"></i></a>
                <a href="/" onClick={(e) => e.preventDefault()}><i className="icon-linkedin"></i></a>
              </div>
            </section>
          </div>

          {/* Nuestra empresa */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Nuestra empresa</h2>
              <div className="empresa-info">
                <img src="assets/img/logos/Logoazul.png" alt="Logo Dosivac" />
                <p>Filiales</p>
                <img src="assets/img/logos/Logo.Dosisur.png" alt="Logo Dosisur" />
                <p>Dirección: Mar del Plata 675, Q8300 Neuquén</p>
                <p>Teléfono: 0299 441-3800</p>
              </div>
            </section>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;