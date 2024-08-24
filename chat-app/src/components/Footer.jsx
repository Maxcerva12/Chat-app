// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-light py-4 mt-5">
//       <div className="container">
//         <div className="row g-4">
//           <div className="col-md-4 mb-3 mb-md-0">
//             <h5 className="fw-bold mb-3">Desarrollador</h5>
//             <p className="mb-1">Maximiliano Cervantes Mendoza</p>
//             <p className="small opacity-75">
//               &copy; {new Date().getFullYear()} Maxcerva12. Todos los derechos
//               reservados.
//             </p>
//           </div>
//           <div className="col-md-4 mb-3 mb-md-0">
//             <h5 className="fw-bold mb-3">Contacto</h5>
//             <p className="mb-2">
//               <a
//                 href="mailto:mc349821@Gmail.com"
//                 className="text-muted text-decoration-none d-flex align-items-center"
//               >
//                 <i className="bi bi-envelope-fill me-2"></i>
//                 mc349821@Gmail.com
//               </a>
//             </p>
//             <p className="mb-1">
//               <a
//                 href="https://github.com/Maxcerva12"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-muted text-decoration-none d-flex align-items-center"
//               >
//                 <i className="bi bi-globe me-2"></i>
//                 www.sitiowebdeldeveloper.com
//               </a>
//             </p>
//           </div>
//           <div className="col-md-4">
//             <h5 className="fw-bold mb-3">Licencia</h5>
//             <p className="mb-1">
//               <a
//                 href="https://opensource.org/licenses/MIT"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-muted text-decoration-none d-flex align-items-center"
//               >
//                 <i className="bi bi-file-earmark-text-fill me-2"></i>
//                 MIT License
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

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
