import React from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [User, SetUser] = useState([]);

  useEffect(() => {
    const Namehandler = () => {
      SetUser(auth.currentUser);
    };
    return () => {
      Namehandler();
    };
  }, []);

  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";
  const Logouthandle = () => {
    signOut(auth);
    navigate("/login");
  };

  // query.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.data());
  // });

  return (
    <div className="navbar">
      <span className="logo">Mind Chat</span>
      <div className="user">
        <img src={User ? User.photoURL : ""} alt=""></img>
        <span>{User ? User.displayName : ""} </span>
        <button onClick={Logouthandle}>Logout</button>
      </div>
    </div>
  );
};
export default Navbar;
