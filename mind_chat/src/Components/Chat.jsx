import Message from "./Message";
import Input from "./Input";
const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>유저가 있다면 displayName</span>
        <div className="chatIcons"></div>
      </div>
      <Message />
      <Input />
    </div>
  );
};

export default Chat;
