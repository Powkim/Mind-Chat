import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GroupRoomNum } from "../../atom";
import { db } from "../../firebase";
import GroupInput from "./GroupInput";
import GroupMessage from "./GroupMessage";

const GroupMessages = () => {
  const [messages, setMessages] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(GroupRoomNum);



  useEffect(() => {
    const res = onSnapshot(doc(db, "GroupChat", RoomId), (doc) => {
      setMessages(doc.data().messages);
    });
    return () => {
      res();
    };
  }, [RoomId]);

  return (
    <div className="messages">
      <GroupMessage messages={messages} />
      <GroupInput />
    </div>
  );
};

export default GroupMessages;
