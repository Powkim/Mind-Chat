import React from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { GroupCreate, GroupRoomNum } from "../atom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect } from "react";

const GroupChat = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(GroupRoomNum);
  const [chats, SetChats] = useState([]);
  const [OnChat, SetOnChat] = useState([]);
  const [On, SetOn] = useRecoilState(GroupCreate);
  const q = getDocs(collection(db, "users"));
  const arr = [];

  const currentUser = auth.currentUser;
  const UserSelectHandle = async (roomid) => {
    //check whether the group(chats in firestore) exists, if not create
    // SetRoomId(Selectuser.uid > user.uid ? Useruid + user.uid : user.uid + Useruid);
    //   const res = await getDoc(doc(db, "chats", RoomId));
    // } catch (err) {}
    SetOn(true);
    //roomid담아서 메시지로 전송?
    SetRoomId(roomid);
  };

  const GroupList = async () => {
    const query = await getDocs(collection(db, "GroupChat"));
    query.forEach((doc) => {
      arr.push(doc.data());
      SetChats(arr);
    });
  };
  console.log(chats);
  // useEffect(() => {
  //   const getChats = () => {
  //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
  //       SetChats(doc.data());
  //     });

  //     return () => {
  //       unsub();
  //     };
  //   };

  //   currentUser.uid && getChats();
  // }, [currentUser.uid]);

  useEffect(() => {
    GroupList();
    // getmsg();
  }, []);
  console.log(chats);
  return (
    <>
      <div className="chats">
        {chats?.map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => UserSelectHandle(chat.messages[0].RoomId)}
          >
            <div className="userChatInfo">
              <img src={chat[1]} alt="" />
              <span>{chat[1]}채팅임</span>
              <p>{chat[1]}채팅임</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default GroupChat;
