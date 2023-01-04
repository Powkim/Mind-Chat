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

  const navigate = useNavigate();

  useEffect(() => {
    const res = onSnapshot(doc(db, "GroupChat", RoomId), (doc) => {
      setMessages(doc.data().messages);
    });
    return () => {
      res();
    };
  }, [RoomId]);

  const Back = () => {
    navigate(-1);
  };

  return (
    <div className="messages">
      <GroupMessage messages={messages} />
      <img
        src="https://user-images.githubusercontent.com/107850055/210494097-558f5195-9268-4bc9-a756-dad620fa0585.png"
        alt=""
        onClick={Back}
      ></img>
      <GroupInput />
    </div>
  );
};

export default GroupMessages;
