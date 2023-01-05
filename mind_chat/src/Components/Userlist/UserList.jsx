import { getDoc, getDocs, collection, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  GroupOn,
  GroupRoomNum,
  GroupUserName,
  Guidlist,
  Menuclick,
  RoomNum,
  UserOn,
} from "../../atom";
import { db, auth } from "../../firebase";
import GroupBtn from "../Groupchat/GroupBtn";

const UserList = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  //이름 변경할것. Btn이랑 겹치는데 기능은 전혀 다름.
  const [BtnOn, SetBtnOn] = useRecoilState(Guidlist);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const [Group, SetGroup] = useRecoilState(GroupOn);
  const [GRoomId, SetGRoomId] = useRecoilState(GroupRoomNum);
  const [UserName, SetUserName] = useRecoilState(GroupUserName);
  const [TitleId, SetTitleId] = useRecoilState(Menuclick);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));
    const arr = [];
    query.forEach((doc) => {
      arr.push(doc.data());
      SetUser(arr);
    });
  };

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = async (Selectuser) => {
    const arr = [];
    arr.push(Selectuser.uid, currentUser.uid);
    SetRoomId([...arr].sort().join(""));
    SetUserClick(!UserClick);

    const res = await getDoc(doc(db, "chats", RoomId));
    try {
      if (!res.exists()) {
        await setDoc(doc(db, "chats", RoomId), {
          messages: [],
          invited: Selectuser,
          makeuser: {
            displayName: currentUser.displayName,
            PhotoURL: currentUser.photoURL,
          },
          lastMsg: "",
        });
      }
    } catch {}
    navigate("/individual/messages");
    SetTitleId(2);
  };
  //그룹채팅방생성
  const GroupChathandle = async (GRoomId, displayName) => {
    const res = await getDoc(doc(db, "GroupChat", GRoomId));
    try {
      if (!res.exists()) {
        await setDoc(doc(db, "GroupChat", GRoomId), {
          messages: [],
          userlist: BtnOn,
          displayName: displayName,
          RoomId: GRoomId,
        });
      }
    } catch (err) {}
  };

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
    SetGRoomId([...newChecked].sort().join(""));
    SetUserName(newName);
  };
  useEffect(() => {
    getUser();
    SetGRoomId("");
    SetRoomId("");
    SetBtnOn([]);
    SetUserClick(false);
  }, []);

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
                onClick={() => {
                  UserSelectHandle(items);
                }}
              >
                <div className="userChatInfo" key={items.uid}>
                  <img src={items.photoURL} alt="" />
                  <span>{items.displayName}</span>
                  <div> </div>
                </div>
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
