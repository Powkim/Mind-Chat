import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GroupCreate, GroupRoomNum, RoomNum, UserOn } from "../atom";
import { auth, db } from "../firebase";
import GroupInput from "./GroupInput";
import GroupMessage from "./GroupMessage";

const GroupMessages = () => {
  const [messages, setMessages] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(GroupRoomNum);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const [On, SetOn] = useRecoilState(GroupCreate);
  const user = auth.currentUser;
  const navigate = useNavigate();
  useEffect(() => {
    const getmessage = async () => {
      // const docRef = doc(db, "chats", RoomId);
      // const docSnap = await getDoc(docRef.data().json());
      const res = await getDoc(doc(db, "GroupChat", RoomId));
      setMessages(res.data().messages);
      console.log(res);
    };
    return () => {
      getmessage();
    };
  }, [RoomId]);

  console.log(messages);
  const Back = () => {
    SetOn(false);
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
      <GroupMessage messages={messages} />
      <button onClick={Back}>뒤로가기</button>
      <GroupInput />
    </div>
  );
};

export default GroupMessages;
