import { async } from "@firebase/util";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { GroupOn, LastMsg, RoomNum, Select, UserOn } from "../atom";
import { db, auth } from "../firebase";
import GroupBtn from "./GroupBtn";

const UserList = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [Selectuser, SetSelectuser] = useRecoilState(Select);
  const [BtnOn, SetBtnOn] = useState(false);
  const [chats, SetChats] = useState([]);
  const [OnChat, SetOnChat] = useState([]);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const q = getDocs(collection(db, "users"));
  const arr1 = [];
  const arr2 = [];
  const currentUser = auth.currentUser;

  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";

  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));

    query.forEach((doc) => {
      arr1.push(doc.data());
      SetUser(arr1.slice(0, 4));
    });
  };
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        SetChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, []);

  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.
  useEffect(() => {
    getUser();
    // getmsg();
  }, []);

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (uid) => {
    SetUserClick(!UserClick);
    SetRoomId(
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid
    );
    console.log(RoomId);
  };

  return (
    <>
      <div className="chats">
        {Object.entries(chats)?.map((chat) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => {
              UserSelectHandle(chat[1].userInfo.uid);
            }}
          >
            <div className="userChatInfo">
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div>
                {" "}
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UserList;
