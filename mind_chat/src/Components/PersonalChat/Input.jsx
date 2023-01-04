import { React, useState } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { v4 as uuid } from "uuid";
import { RoomNum } from "../../atom";
import { useRecoilState } from "recoil";

const Input = () => {
  const [text, SetText] = useState("");
  const [ChatId, SetChatId] = useRecoilState(RoomNum);
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
      lastMsg: text,
    });
  };

  return (
    <div className="input">
      <input
        placeholder="Type something..."
        onChange={(e) => SetText(e.target.value)}
        value={text}
      />
      <div className="send">
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
