import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/Confing-firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

function PrivateChatsList() {
  const [privateChats, setPrivateChats] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "privateChats"),
        where("participants", "array-contains", user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Chats privados cargados:", chats); 
        setPrivateChats(chats);
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div>
      <h2>Mis Chats Privados</h2>
      <ul>
        {privateChats.map((chat) => (
          <li key={chat.id}>
            <Link to={`/private-chat/${chat.id}`}>
              Chat con {chat.participants.find((id) => id !== user.uid)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PrivateChatsList;
