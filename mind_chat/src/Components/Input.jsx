import { React, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { auth } from "../firebase";
import { v4 as uuid } from "uuid";
import { RoomNum } from "../atom";
import { useRecoilState } from "recoil";
const Input = () => {
  const [text, SetText] = useState("");
  const [ChatId, SetChatId] = useRecoilState(RoomNum);
  const currentUser = auth.currentUser;
  const RoomId = "";
  const handleSend = async () => {
    //data.chatId는 채팅방 id임
    await updateDoc(doc(db, "chats", ChatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
  };
  console.log(ChatId);
  console.log(text);
  return (
    <div className="input">
      <input
        placeholder="Type something..."
        onChange={(e) => SetText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src="" alt="" />
        {/* <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => SetImg(e.target.files[0])}
        /> */}
        {/* <label htmlFor="file">
          <img src="" alt="" />
        </label> */}
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
