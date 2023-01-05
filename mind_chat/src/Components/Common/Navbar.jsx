import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const User = auth.currentUser;
  const Logouthandle = () => {
    signOut(auth);
    navigate("/login");
  };

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
