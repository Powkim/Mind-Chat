import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
const SignUp = () => {
  const navigate = useNavigate();
  //에러관리용 State설정해서 회원가입 에러시 문구 띄워줘야함.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            await setDoc(doc(db, "GroupuserChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {}
  };
  // const res = createUserWithEmailAndPassword(auth, email, password)
  //   .then(async (userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     console.log();
  //     updateProfile(auth.currentUser, {
  //       displayName,
  //     });
  //     setDoc(doc(db, "users", user.uid), {
  //       uid: user.uid,
  //       displayName,
  //       email,
  //     });
  //     await setDoc(doc(db, "userChats", user.uid), {});

  //     // ...
  //   })

  // };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Welcome to Mind Chat</span>
        <span className="title">회원가입</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User name"></input>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src="" alt="" />
            <span>Add an avatar</span>
          </label>
          <button>회원가입 하기</button>
        </form>
        <p>
          <Link to="/login">You do have an account?Login</Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
