import React from "react";
import { GroupRoomNum } from "../../atom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GroupChat = () => {
  const [RoomId, SetRoomId] = useRecoilState(GroupRoomNum);
  const [chats, SetChats] = useState([]);

  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const UserSelectHandle = async (roomid) => {
    SetRoomId(roomid);
    navigate("/group/messages");
  };

  const GroupList = async () => {
    const query = await getDocs(collection(db, "GroupChat"));
    const arr = [];
    const arr2 = [];
    query.forEach((doc) => {
      arr.push(doc.data());
    });

    arr.map((items) => {
      //디스플레이 네임에 내 이름이 있는지 확인
      //있다면 배열에 추가해준뒤 채팅에 담기.
      if (items.displayName.includes(currentUser.displayName)) {
        arr2.push(items);
        SetChats(arr2);
      }
    });
  };

  useEffect(() => {
    GroupList();
  }, []);

  return (
    <>
      <div className="chats">
        {chats?.map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => UserSelectHandle(chat.messages[1].RoomId)}
          >
            <div className="userChatInfo">
              <img
                src="https://user-images.githubusercontent.com/107850055/210293034-895ff441-3c8d-48ad-9db2-5d465090d0f6.jpg"
                alt=""
              />

              <div>
                <span className="GroupUser"> {chat.displayName} </span>
                <p>{chat.lastMsg ? chat.lastMsg[0].lastMsg : ""}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default GroupChat;
