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
import {
  GroupChatList,
  GroupCreate,
  GroupOn,
  GroupRoomNum,
  GroupUserName,
  RoomNum,
  Select,
  UserOn,
} from "../atom";
import { db, auth } from "../firebase";
import GroupBtn from "./GroupBtn";

const UserList = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [SelectUser, SetSelectUser] = useRecoilState(Select);
  const [BtnOn, SetBtnOn] = useState([]);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const [Group, SetGroup] = useRecoilState(GroupOn);
  const q = getDocs(collection(db, "users"));
  const [GRoomId, SetGRoomId] = useRecoilState(GroupRoomNum);
  const [UserName, SetUserName] = useRecoilState(GroupUserName);
  //그룹챗 생성 여부 확인용
  const [On, SetOn] = useRecoilState(GroupCreate);
  const currentUser = auth.currentUser;

  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));
    const arr = [];
    query.forEach((doc) => {
      arr.push(doc.data());
      SetUser(arr);
    });
  };

  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (Selectuser) => {
    //check whether the group(chats in firestore) exists, if not create
    SetRoomId(
      currentUser.uid > Selectuser.uid
        ? currentUser.uid + Selectuser.uid
        : Selectuser.uid + currentUser.uid
    );
    SetSelectUser(Selectuser);
    SetUserClick(!UserClick);

    const res = await getDoc(doc(db, "chats", RoomId));
    try {
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", RoomId), {
          messages: [],
          userList: Selectuser,
          lastMsg: "",
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [RoomId + ".userInfo"]: {
            uid: SelectUser.uid,
            displayName: SelectUser.displayName,
            photoURL: SelectUser.photoURL,
          },
          [RoomId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", SelectUser.uid), {
          [RoomId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [RoomId + ".date"]: serverTimestamp(),
        });
        //create user chats
      }
    } catch (err) {}
  };
  //그룹채팅방생성
  const GroupChathandle = async (GRoomId, displayName) => {
    const res = await getDoc(doc(db, "GroupChat", GRoomId));
    // const query = await getDoc(doc(db, "userChats", SelectUser.uid));
    try {
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "GroupChat", GRoomId), {
          messages: [],
          userlist: BtnOn,
          displayName: displayName,
        });
      }
    } catch (err) {}
  };

  //1번. 그룹쳇 전체 문서를 부르고 거기에 내 유저 아이디가 있으면 그거만 필터로 걸러서 가져오기.
  const CheckedHandle = (uid, displayName) => {
    //uid를 추가해야 하는경우
    //체크가 되어있고 배열에 없어야함
    //만약 체크를 해제하면 배열에서 빼야함.
    const currentIdx = BtnOn.indexOf(uid);
    const newChecked = [...BtnOn];
    const newName = [...UserName];
    if (currentIdx === -1) {
      newChecked.push(uid);
      newName.push(displayName);
    } else {
      newChecked.splice(currentIdx, 1);
      newName.splice(currentIdx, 1);
    }
    SetBtnOn(newChecked);
    SetGRoomId(BtnOn.sort().join(""));
    SetUserName(newName);
    console.log(newName);
    console.log(UserName);
  };
  useEffect(() => {
    getUser();
  }, []);
  SetGroup(false);
  return (
    <>
      <div className="chats">
        {User.map((items) => {
          return (
            <div className="userChat">
              {Group ? (
                <input
                  type="checkbox"
                  onClick={() => {
                    CheckedHandle(items.uid, items.displayName);
                  }}
                ></input>
              ) : null}
              <div
                className="userChatInfo"
                key={items.uid}
                onClick={() => {
                  UserSelectHandle(items);
                }}
              >
                <img src={items.photoURL} alt="" />
                <span>{items.displayName}</span>
                <div> </div>
              </div>
            </div>
          );
        })}
      </div>
      <GroupBtn GroupChathandle={GroupChathandle} />
    </>
  );
};
export default UserList;
