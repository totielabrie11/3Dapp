import React from 'react';
import './Footer.css'; // Asegúrate de enlazar el CSS correcto para los estilos

const Footer = () => {
  return (
    <div id="footer-wrapper">
      <footer id="footer" className="container">
        <div className="row">
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Enlaces Importantes</h2>
              <ul className="divided">
                <li><a href="/" onClick={(e) => e.preventDefault()}>Política de privacidad</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Términos y condiciones</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Sobre nosotros</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Contacta con nosotros</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Ayuda y soporte</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Carreras</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Blog</a></li>
              </ul>
            </section>
          </div>
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Más Enlaces</h2>
              <ul className="divided">
                <li><a href="/" onClick={(e) => e.preventDefault()}>FAQs</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Documentación técnica</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Casos de estudio</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>API</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Foro de la comunidad</a></li>
              </ul>
            </section>
            <section>
              <h2>Aún Más Enlaces</h2>
              <ul className="divided">
                <li><a href="/" onClick={(e) => e.preventDefault()}>Noticias y eventos</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Inversores</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Prensa</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Mapa del sitio</a></li>
              </ul>
            </section>
          </div>
          <div className="col-6 col-12-medium imp-medium">
            <section>
              <h2><strong>ZeroCuatro</strong> por HTML5 UP</h2>
              <p>¡Hola! Esto es <strong>ZeroCuatro</strong>, una plantilla HTML5 totalmente receptiva y gratuita.</p>
              <a href="/" onClick={(e) => e.preventDefault()} className="button alt icon solid fa-arrow-circle-right">Aprender más</a>
            </section>
            <section>
              <h2>Contáctanos</h2>
              <div className="row">
                <div className="col-6 col-12-small">
                  <dl className="contact">
                    <dt>Twitter</dt>
                    <dd><a href="/" onClick={(e) => e.preventDefault()}>@untitled-corp</a></dd>
                    <dt>Facebook</dt>
                    <dd><a href="/" onClick={(e) => e.preventDefault()}>facebook.com/untitled</a></dd>
                    <dt>WWW</dt>
                    <dd><a href="/" onClick={(e) => e.preventDefault()}>untitled.tld</a></dd>
                    <dt>Email</dt>
                    <dd><a href="/" onClick={(e) => e.preventDefault()}>user@untitled.tld</a></dd>
                  </dl>
                </div>
                <div className="col-6 col-12-small">
                  <dl className="contact">
                    <dt>Dirección</dt>
                    <dd>1234 Calle Ficticia<br />Nashville, TN 00000-0000<br />USA</dd>
                    <dt>Teléfono</dt>
                    <dd>(000) 000-0000</dd>
                  </dl>
                </div>
              </div>
            </section>
          </div>
          <div className="col-12">
            <div id="copyright">
              <ul className="menu">
                <li>&copy; Sin título. Todos los derechos reservados</li>
                <li>Diseño: <a href="http://html5up.net">Charly - Malu</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

