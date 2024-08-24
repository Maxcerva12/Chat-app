// // src/helpers/LoadData.js
// import { db } from "../firebase/Confing-firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { ChatTypes } from "../types/ChatTypes"; // Creamos un nuevo archivo de tipos específico para el chat

// export const loadUserMessages = (uid) => {
//   return async (dispatch) => {
//     dispatch({ type: ChatTypes.messagesRead }); // Indica que la carga de mensajes ha comenzado
//     try {
//       const messagesCollectionRef = collection(db, "usuarios", uid, "mensajes");
//       const querySnapshot = await getDocs(messagesCollectionRef);
//       const messagesData = [];
//       querySnapshot.forEach((doc) => {
//         messagesData.push({ id: doc.id, ...doc.data() });
//       });
//       console.log("Mensajes cargados:", messagesData);
//       dispatch({ type: ChatTypes.messagesLoad, payload: messagesData });
//     } catch (error) {
//       console.error("Error al cargar los mensajes:", error);
//       dispatch({ type: ChatTypes.messagesError, payload: error.message });
//     }
//   };
// };
