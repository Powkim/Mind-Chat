import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const GroupMessage = ({ messages }) => {
  const currentUser = auth.currentUser;
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messageWrap">
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
              <img src={BasePhoto} alt="" />
              <span></span>
            </div>
            <div className="messageContent">
              <p>{items.text}</p>
              <img src="" alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupMessage;
