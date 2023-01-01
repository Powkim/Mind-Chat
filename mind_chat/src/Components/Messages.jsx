import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { RoomNum } from "../atom";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);

  const getmessage = async () => {
    // const docRef = doc(db, "chats", RoomId);
    // const docSnap = await getDoc(docRef.data().json());
    const res = await getDoc(doc(db, "chats", `${RoomId}`));
    setMessages(res.data().messages);
  };

  useEffect(() => {
    getmessage();
  }, [RoomId]);
  console.log(messages);

  return (
    <div className="messages">
      <Message message={messages} />
    </div>
  );
};

export default Messages;
