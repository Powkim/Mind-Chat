import { React, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

import { db, storage } from "../firebase";
import { auth } from "../firebase";
import { v4 as uuid } from "uuid";
import { RoomNum, Select } from "../atom";
import { useRecoilState } from "recoil";

const Input = () => {
  const [text, SetText] = useState("");
  const [ChatId, SetChatId] = useRecoilState(RoomNum);
  const [Selectuser, SetSelectuser] = useRecoilState(Select);
  const currentUser = auth.currentUser;

  const handleSend = async () => {
    //data.chatId는 채팅방 id임
    //채팅방 에러만 고치면 다 잘 돌아갈듯
    //클릭할때마다 방이 새로 생겨서  데이터가 계속 날아감.
    await updateDoc(doc(db, "chats", ChatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        RoomId: ChatId,
      }),
    });

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [ChatId + ".lastMessage"]: {
        text,
      },
      [ChatId + ".userInfo"]: {
        uid: Selectuser.uid,
        displayName: Selectuser.displayName,
        photoURL: Selectuser.photoURL,
      },
      [ChatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", Selectuser.uid), {
      [ChatId + ".lastMessage"]: {
        text,
      },

      [ChatId + ".date"]: serverTimestamp(),
    });

    // setDoc(doc(db, "LastChat", ChatId), {
    //   text,
    //   ChatId,
    // });
    // SetLastMsg({ text, Useruid });
  };

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
