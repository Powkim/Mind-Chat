import { getDocs, collection } from "firebase/firestore";

import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { RoomNum, Select, UserOn } from "../atom";
import { db, auth } from "../firebase";

const UserList = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [chats, SetChats] = useState([]);
  const [OnChat, SetOnChat] = useState([]);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const q = getDocs(collection(db, "users"));
  const currentUser = auth.currentUser;
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";

  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));
    const arr = [];
    query.forEach((doc) => {
      arr.push(doc.data());
      SetUser(arr);
    });
  };
  const getData = async () => {
    const query = await getDocs(collection(db, "chats"));
    const arr = [];
    query.forEach((doc) => {
      arr.push(doc.data());
      SetChats(arr);
    });
  };
  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.
  useEffect(() => {
    getUser();
    getData();
    // getmsg();
  }, []);

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (uid) => {
    SetUserClick(!UserClick);
    SetRoomId(
      currentUser.uid > uid ? currentUser.uid + uid : uid + currentUser.uid
    );
  };

  return (
    <>
      <div className="chats">
        {chats?.map((chat) => (
          <div
            className="userChat"
            onClick={() => {
              UserSelectHandle(chat.userList.uid);
            }}
          >
            <div className="userChatInfo">
              <img src={chat.userList.photoURL} alt="" />
              <div>
                <span>{chat.userList.displayName}</span>
                <p>{chat.lastMsg}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default UserList;
