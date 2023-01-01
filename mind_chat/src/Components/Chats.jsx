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
import { RoomNum, UserId } from "../atom";
import { db, auth } from "../firebase";

const Chats = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [Useruid, SetUseruid] = useRecoilState(UserId);
  const q = getDocs(collection(db, "users"));
  const arr = [];
  const currentUser = auth.currentUser;
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";

  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));
    query.forEach((doc) => {
      arr.push(doc.data());
      SetUser(arr.slice(0, 4));
    });
  };

  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.
  useEffect(() => {
    getUser();
  }, []);
  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (user, uid) => {
    //check whether the group(chats in firestore) exists, if not create
    SetRoomId(
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    );
    SetUseruid(uid);
    console.log(Useruid);
    console.log(uid);
    console.log(currentUser.uid > uid);
    try {
      const res = await getDoc(doc(db, "chats", RoomId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", RoomId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [RoomId + ".userInfo"]: {
            uid: uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [RoomId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", uid), {
          [RoomId + ".userInfo"]: {
            uid: uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [RoomId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
  };
  //채팅방 클릭시 채팅방 번호 뜨도록 구현하고 데이터 띄울것.

  // useEffect(() => {
  //   UserList.map(async (items) => {
  //     const docRef = doc(db, "users", "GX9K5Gx5VLTiRfeSjL6730Psxhc2");
  //     const docSnap = await getDoc(docRef);
  //     //이거 위에처럼 배열에 담아줄것.

  //     SetUser(
  //       docSnap.data().map((itmes) => ({
  //         displayName: items.displayName,
  //         id: docSnap.data().uid,
  //       }))
  //     );
  //   });
  // }, []);

  return (
    <div className="chats">
      {User.map((items) => {
        return (
          <div
            className="userChat"
            onClick={() => {
              UserSelectHandle(items, items.uid);
            }}
          >
            <img src={BasePhoto} alt="" />
            <div className="userChatInfo" key={items.id}>
              <span>{items.displayName}</span>
              <p>{items.displayName}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Chats;
