import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { auth } from "../../firebase";

const Message = ({ message }) => {
  const currentUser = auth.currentUser;
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="messageWrap">
      {message.map((items) => {
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
            <p></p>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
