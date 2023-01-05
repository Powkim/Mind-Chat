import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const GroupMessage = ({ messages }) => {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";
  const Back = () => {
    navigate(-1);
  };
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messages);
  return (
    <div className="messageWrap">
      <img
        className="BackIcon"
        src="https://user-images.githubusercontent.com/107850055/210494097-558f5195-9268-4bc9-a756-dad620fa0585.png"
        alt=""
        onClick={Back}
      ></img>

      {messages.map((items) => {
        return (
          <div
            ref={ref}
            className={`message ${
              items.senderId === currentUser.uid && "owner"
            }`}
            key={items.id}
          >
            <div className="messageInfo">
              <span>{items.displayName}</span>
              <img src={items.photoURL} alt="" />
            </div>
            <div className="messageContent">
              <p>{items.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupMessage;
