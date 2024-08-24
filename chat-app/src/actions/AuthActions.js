import { auth, googleAuthProvider } from "../firebase/Confing-firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged, // Importación añadida
} from "firebase/auth";
import { ChatTypes } from "../types/ChatTypes";

export const googleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const { user } = result;
        dispatch(login(user.uid, user.displayName));
        // El inicio de sesión fue exitoso
        // console.log(result);
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
      });
  };
};

export const emailAndPasswordLogin = (email, password) => {
  return (dispatch) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // await updateProfile(user, { displayName: username });
        // El usuario ha sido registrado
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        throw error; // Propaga el error para que el componente pueda manejarlo
      });
  };
};

// export const register = (email, username, password) => {
//   return (dispatch) => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;
//         await updateProfile(user, { displayName: username });
//         // El usuario ha sido registrado
//         dispatch(login(user.uid, user.displayName));
//       })
//       .catch((error) => {
//         console.error("Error al registrar el usuario:", error);
//       });
//   };
// };

export const register = (email, username, password) => {
  return (dispatch) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await updateProfile(user, { displayName: username });
        // El usuario ha sido registrado
        dispatch(login(user.uid, user.displayName));
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        throw error; // Propaga el error para que el componente pueda manejarlo
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: ChatTypes.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch({
        type: ChatTypes.logout,
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
};

// verificar el estado de autenticación
export const checkAuthState = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user.uid, user.displayName));
      } else {
        dispatch(logout());
      }
    });
  };
};
