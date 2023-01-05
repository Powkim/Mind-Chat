import { getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { RoomNum, UserOn } from "../../atom";
import { db, auth } from "../../firebase";

const UserList = () => {
  const [User, SetUser] = useState([]);
  const [RoomId, SetRoomId] = useRecoilState(RoomNum);
  const [chats, SetChats] = useState([]);
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

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

  useEffect(() => {
    getUser();
    getData();
  }, []);

  //유저 선택시 채팅방 만들기
  const UserSelectHandle = (uid) => {
    SetUserClick();
    const arr = [];
    arr.push(uid, currentUser.uid);
    SetRoomId([...arr].sort().join(""));

    navigate("/individual/messages");
  };

  return (
    <>
      <div className="chats">
        {chats?.map((chat) => (
          <div
            className="userChat"
            onClick={() => {
              UserSelectHandle(chat.invited.uid);
            }}
          >
            <div className="userChatInfo">
              <img
                src={
                  chat.makeuser.displayName === currentUser.displayName
                    ? chat.invited.photoURL
                    : chat.makeuser.PhotoURL
                }
                alt=""
              />
              <div>
                <span>
                  {" "}
                  {chat.makeuser.displayName === currentUser.displayName
                    ? chat.invited.displayName
                    : chat.makeuser.displayName}
                </span>
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
