// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { register } from "../actions/AuthActions.js";
// import "../Styles/RegisterScreen.css";

// const Register = () => {
//   const dispatch = useDispatch();
//   const [data, setData] = useState({
//     email: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const { email, username, password, confirmPassword } = data;

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setErrorMessage("");

//     if (email.trim() === "" || !email.trim().includes(".com")) {
//       setErrorMessage("Por favor, ingresa un email válido.");
//       return;
//     }

//     if (username.trim().length <= 2) {
//       setErrorMessage("El nombre de usuario debe tener más de 2 caracteres.");
//       return;
//     }

//     if (password.trim().length < 6) {
//       setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
//       return;
//     }

//     if (password.trim() !== confirmPassword.trim()) {
//       setErrorMessage("Las contraseñas no coinciden.");
//       return;
//     }

//     setIsLoading(true);
//     dispatch(register(email, username, password))
//       .then(() => {
//         // Registro exitoso
//       })
//       .catch((error) => {
//         setErrorMessage(
//           "Ocurrió un error al registrarse. Por favor, intenta de nuevo."
//         );
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   return (
//     <div className="register-page animate__animated animate__zoomIn">
//       <div className="register-image">
//         <img loading="lazy" src="/imgs/6034134.jpg" alt="Register" />
//       </div>
//       <div className="register-container">
//         <div className="register-card">
//           <h2 className="register-title">Crear cuenta</h2>
//           <p className="register-subtitle">Regístrate para comenzar</p>

//           {errorMessage && <div className="error-message">{errorMessage}</div>}

//           <form onSubmit={handleRegister} className="register-form">
//             <div className={`input-container ${email ? "has-value" : ""}`}>
//               <i className="fas fa-envelope input-icon"></i>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Email</label>
//             </div>

//             <div className={`input-container ${username ? "has-value" : ""}`}>
//               <i className="fas fa-user input-icon"></i>
//               <input
//                 type="text"
//                 name="username"
//                 value={username}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Nombre de usuario</label>
//             </div>

//             <div className={`input-container ${password ? "has-value" : ""}`}>
//               <i className="fas fa-lock input-icon"></i>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={password}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Contraseña</label>
//               <i
//                 className={`fas ${
//                   showPassword ? "fa-eye-slash" : "fa-eye"
//                 } toggle-password`}
//                 onClick={() => setShowPassword(!showPassword)}
//               ></i>
//             </div>

//             <div
//               className={`input-container ${
//                 confirmPassword ? "has-value" : ""
//               }`}
//             >
//               <i className="fas fa-lock input-icon"></i>
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//               <label>Confirmar Contraseña</label>
//               <i
//                 className={`fas ${
//                   showConfirmPassword ? "fa-eye-slash" : "fa-eye"
//                 } toggle-password`}
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               ></i>
//             </div>

//             <button
//               type="submit"
//               className="register-button"
//               disabled={isLoading}
//             >
//               {isLoading ? "Registrando..." : "Registrarse"}
//             </button>
//           </form>

//           <p className="login-link">
//             ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../actions/AuthActions.js";
import "../Styles/RegisterScreen.css";

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email, username, password, confirmPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (email.trim() === "" || !email.trim().includes(".com")) {
      setErrorMessage("Por favor, ingresa un email válido.");
      return;
    }

    if (username.trim().length <= 2) {
      setErrorMessage("El nombre de usuario debe tener más de 2 caracteres.");
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    dispatch(register(email, username, password))
      .then(() => {
        // Registro exitoso
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(
          "Ocurrió un error al registrarse. Por favor, intenta de nuevo."
        );
        setIsLoading(false);
      });
  };

  return (
    <div className="register-page animate__animated animate__zoomIn">
      <div className="register-image">
        <img loading="lazy" src="/imgs/12.png" alt="Register" />
      </div>
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Crear cuenta</h2>
          <p className="register-subtitle">Regístrate para comenzar</p>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={handleRegister} className="register-form">
            <div className={`input-container ${email ? "has-value" : ""}`}>
              <i className="fas fa-envelope input-icon"></i>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className={`input-container ${username ? "has-value" : ""}`}>
              <i className="fas fa-user input-icon"></i>
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required
              />
              <label>Nombre de usuario</label>
            </div>

            <div className={`input-container ${password ? "has-value" : ""}`}>
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <label>Contraseña</label>
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <div
              className={`input-container ${
                confirmPassword ? "has-value" : ""
              }`}
            >
              <i className="fas fa-lock input-icon"></i>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirmar contraseña</label>
              <i
                className={`fas ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>

            <button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <p className="register-footer">
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
