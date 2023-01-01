import React from "react";
import { auth } from "../firebase";

const Message = ({ message }) => {
  const currentUser = auth.currentUser;
  const BasePhoto =
    "https://user-images.githubusercontent.com/107850055/210062348-8d3c5b2d-5cc1-46f8-9302-02832691c9c1.png";
  console.log(message);
  return (
    <>
      {message.map((items) => {
        return (
          <div
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
    </>
  );
};

export default Message;
