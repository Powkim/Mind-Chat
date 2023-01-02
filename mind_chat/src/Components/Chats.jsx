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

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  //원래대로면 chat[0]했을때 나오는게 맞음.
  // const getmsg = async () => {
  //   const query = await getDocs(doc(db, "chats", Useruid));
  //   console.log(query.data());
  //   SetOnChat(arr2);
  //   console.log(OnChat);
  // };

  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.
  useEffect(() => {
    getUser();
    // getmsg();
  }, []);

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (uid) => {
    //check whether the group(chats in firestore) exists, if not create
    // SetRoomId(Selectuser.uid > user.uid ? Useruid + user.uid : user.uid + Useruid);

    SetUserClick(!UserClick);
    SetRoomId(
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid
    );
    console.log(RoomId);
    // try {
    //   const res = await getDoc(doc(db, "chats", RoomId));
    // } catch (err) {}
  };

  const arr = "";
  // const CheckedHandle = (uid) => {
  //   SetBtnOn(!BtnOn);

  //   if (BtnOn) {
  //     arr = uid;
  //   }
  // };

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
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UserList;
