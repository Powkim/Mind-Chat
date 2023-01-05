import { React, useState } from "react";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { v4 as uuid } from "uuid";
import { GroupRoomNum } from "../../atom";
import { useRecoilState } from "recoil";

const GroupInput = () => {
  const [text, SetText] = useState("");
  const [ChatId, SetChatId] = useRecoilState(GroupRoomNum);

  const currentUser = auth.currentUser;

  const handleSend = async () => {
    await updateDoc(doc(db, "GroupChat", ChatId), {
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        RoomId: ChatId,
        lastMsg: text,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      lastMsg: arrayUnion({
        lastMsg: text,
      }),
    });

    SetText("");
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

export default GroupInput;
