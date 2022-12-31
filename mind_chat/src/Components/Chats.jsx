import { async } from "@firebase/util";
import { getDoc, getDocs, collection, doc } from "firebase/firestore";
import { query, where, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";

const Chats = () => {
  const [User, SetUser] = useState([]);
  const q = getDocs(collection(db, "users"));
  const arr = [];
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     cities.push(doc.data().name);
  //   });
  //   console.log("Current cities in CA: ", cities.join(", "));
  // });

  const getUser = async () => {
    const query = await getDocs(collection(db, "users"));
    query.forEach((doc) => {
      SetUser.push(doc.data());
    });
  };

  //위에 id값 가지고 map돌려서 id값 이용해서 디스플레이 네임 조회 해야함.
  useEffect(() => {
    getUser();
  }, []);
  const UserSelectHandle = () => {};

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
  console.log(User);
  return (
    <div className="chats">
      {User.map((items) => {
        return (
          <div className="userChat" onClick={UserSelectHandle}>
            <img src={BasePhoto} alt="" />
            <div className="userChatInfo" key={items.id}>
              <span>{items.displayName}</span>
              <p>lastMessage?.text</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Chats;
