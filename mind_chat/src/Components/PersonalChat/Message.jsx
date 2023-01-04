import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Message = ({ message }) => {
  const currentUser = auth.currentUser;
  const ref = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const Back = () => {
    navigate(-1);
  };

  return (
    <div className="messageWrap">
      <img
        className="BackIcon"
        src="https://user-images.githubusercontent.com/107850055/210494097-558f5195-9268-4bc9-a756-dad620fa0585.png"
        alt=""
        onClick={Back}
      ></img>
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
