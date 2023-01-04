import Input from "./Input";
import { auth, db } from "../firebase";
import { useRecoilState } from "recoil";
import { RoomNum, UserId } from "../atom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import Messages from "./Messages";

//SenderId가 나타나야함.
//Message는 SenderId가 커렌트 유저랑 일치하는지 여부로 채팅창 다르게 보여주면 될듯.
const Chat = () => {
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [Useruid, SetUseruid] = useRecoilState(UserId);
  const [UserData, SetUserData] = useState();
  const getUser = async () => {
    const docSnap = await getDoc(doc(db, "users", Useruid));

    SetUserData(docSnap.data().displayName);
  };
  useEffect(() => {
    getUser();
  }, [Useruid]);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{UserData}</span>
        <div className="chatIcons"></div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
