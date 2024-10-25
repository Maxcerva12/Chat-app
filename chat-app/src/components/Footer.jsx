import React from "react";
import "../Styles/Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h5 className="footer-title">Desarrollador</h5>
          <p className="footer-text">Maximiliano Cervantes Mendoza</p>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Maxcerva12. Todos los derechos
            reservados.
          </p>
        </div>
        <div className="footer-section">
          <h5 className="footer-title">Contacto</h5>
          <a href="mailto:mc349821@Gmail.com" className="footer-link">
            <i className="fas fa-envelope"></i>
            mc349821@Gmail.com
          </a>
          <a
            href="https://github.com/Maxcerva12"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="fab fa-github"></i>
            GitHub
          </a>
        </div>
        <div className="footer-section">
          <h5 className="footer-title">Licencia</h5>
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <i className="fas fa-file-alt"></i>
            MIT License
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
