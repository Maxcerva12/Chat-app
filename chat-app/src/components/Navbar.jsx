// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link } from "react-router-dom";
// // import { logout } from "../actions/AuthActions";
// // import "../Styles/Navbar.css";

// // const Navbar = () => {
// //   const dispatch = useDispatch();
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const user = useSelector((state) => state.auth.user);

// //   const handleLogout = () => {
// //     dispatch(logout());
// //   };

// //   const toggleMenu = () => {
// //     setIsMenuOpen(!isMenuOpen);
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="navbar-container">
// //         <Link to="/" className="navbar-logo" aria-label="Home">
// //           <img
// //             src="/imgs/NominaSmart_transparent-.png"
// //             alt="Logo"
// //             className="navbar-logo"
// //           />
// //         </Link>
// //         <div className="menu-icon" onClick={toggleMenu}>
// //           <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
// //         </div>
// //         <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
// //           {user && (
// //             <>
// //               <li className="nav-item">
// //                 <Link to="/" className="nav-links">
// //                   Sala Pública
// //                 </Link>
// //               </li>
// //               <li className="nav-item">
// //                 <Link to="/users" className="nav-links">
// //                   Lista de Usuarios
// //                 </Link>
// //               </li>
// //               <li className="nav-item">
// //                 <Link to="/private-chats" className="nav-links">
// //                   Mis Chats Privados
// //                 </Link>
// //               </li>
// //             </>
// //           )}
// //           <li className="nav-item">
// //             <button
// //               onClick={handleLogout}
// //               className="logout-button"
// //               aria-label="Logout"
// //             >
// //               Cerrar sesión
// //             </button>
// //           </li>
// //         </ul>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { logout } from "../actions/AuthActions";
// import "../Styles/Navbar.css";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     const M = window.M;
//     M.AutoInit();
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="navbar-fixed">
//       <nav className="navbar-custom">
//         <div className="nav-wrapper container">
//           <Link to="/" className="brand-logo">
//             Chat
//           </Link>
//           <a href="#" data-target="mobile-demo" className="sidenav-trigger">
//             <i className="material-icons">menu</i>
//           </a>
//           <ul className="right hide-on-med-and-down">
//             {user && (
//               <>
//                 <li>
//                   <Link to="/" className="nav-link">
//                     <i className="material-icons left">chat</i>
//                     Sala Pública
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/users" className="nav-link">
//                     <i className="material-icons left">group</i>
//                     Lista de Usuarios
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/private-chats" className="nav-link">
//                     <i className="material-icons left">lock</i>
//                     Mis Chats Privados
//                   </Link>
//                 </li>
//               </>
//             )}
//             <li>
//               <button onClick={handleLogout} className="nav-button">
//                 <i className="material-icons left">exit_to_app</i>
//                 Cerrar sesión
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       <ul className="sidenav" id="mobile-demo">
//         {user && (
//           <>
//             <li>
//               <Link to="/" className="sidenav-close nav-link">
//                 <i className="material-icons left">chat</i>
//                 Sala Pública
//               </Link>
//             </li>
//             <li>
//               <Link to="/users" className="sidenav-close nav-link">
//                 <i className="material-icons left">group</i>
//                 Lista de Usuarios
//               </Link>
//             </li>
//             <li>
//               <Link to="/private-chats" className="sidenav-close nav-link">
//                 <i className="material-icons left">lock</i>
//                 Mis Chats Privados
//               </Link>
//             </li>
//           </>
//         )}
//         <li>
//           <button onClick={handleLogout} className="sidenav-close nav-button">
//             <i className="material-icons left">exit_to_app</i>
//             Cerrar sesión
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/AuthActions";
import "../Styles/Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const M = window.M;
    M.AutoInit();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar-fixed">
      <nav className="navbar-custom">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            <i className="material-icons left">chat</i>Chat
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {user && (
              <>
                <li>
                  <Link to="/" className="nav-link">
                    <i className="material-icons left">chat</i>
                    Sala Pública
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="nav-link">
                    <i className="material-icons left">group</i>
                    Lista de Usuarios
                  </Link>
                </li>
                <li>
                  <Link to="/private-chats" className="nav-link">
                    <i className="material-icons left">lock</i>
                    Mis Chats Privados
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout} className="nav-button">
                <i className="material-icons left">exit_to_app</i>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {user && (
          <>
            <li>
              <Link to="/" className="sidenav-close nav-link">
                <i className="material-icons left">chat</i>
                Sala Pública
              </Link>
            </li>
            <li>
              <Link to="/users" className="sidenav-close nav-link">
                <i className="material-icons left">group</i>
                Lista de Usuarios
              </Link>
            </li>
            <li>
              <Link to="/private-chats" className="sidenav-close nav-link">
                <i className="material-icons left">lock</i>
                Mis Chats Privados
              </Link>
            </li>
          </>
        )}
        <li>
          <button onClick={handleLogout} className="sidenav-close nav-button">
            <i className="material-icons left">exit_to_app</i>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
