import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { RoomNum, UserOn } from "../atom";
import { auth, db } from "../firebase";
import Input from "./Input";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const user = auth.currentUser;
  const navigate = useNavigate();

  useEffect(() => {
    // const docRef = doc(db, "chats", RoomId);
    // const docSnap = await getDoc(docRef.data().json());
    const res = onSnapshot(doc(db, "chats", RoomId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      res();
    };
  }, [RoomId]);
  console.log(messages);
  console.log(RoomId);
  const Back = () => {
    SetUserClick(false);
    navigate(-1);
  };

  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
  //     doc.exists() && setMessages(doc.data().messages);
  //   });

  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);
  return (
    <div className="messages">
      <Message message={messages} />
      <button onClick={Back}>뒤로가기</button>
      <Input />
    </div>
  );
};

export default Messages;
