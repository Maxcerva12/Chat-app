// chatService.js

import { db } from "../firebase/Confing-firebase";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export const sendPrivateChatRequest = async (initiatorId, recipientId) => {
  // Enviar una solicitud de chat privado
  await addDoc(collection(db, "privateChatRequests"), {
    initiatorId,
    recipientId,
    timestamp: new Date(),
  });
};

export const acceptPrivateChatRequest = async (initiatorId, recipientId) => {
  // Aceptar una solicitud de chat privado
  await addDoc(collection(db, "privateChatResponses"), {
    initiatorId,
    recipientId,
    timestamp: new Date(),
  });
};
