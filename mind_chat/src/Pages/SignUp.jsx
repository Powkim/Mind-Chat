import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  //에러관리용 State설정해서 회원가입 에러시 문구 띄워줘야함.
  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Welcome to Mind Chat</span>
        <span className="title">회원가입</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="User name"></input>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <button>회원가입 하기</button>
        </form>
        <p>You do have an account?</p>
      </div>
    </div>
  );
};
export default SignUp;
