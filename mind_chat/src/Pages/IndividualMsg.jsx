import { useRecoilState } from "recoil";
import { UserOn } from "../atom";
import Chats from "../Components/Chats";
import Menu from "../Components/Menu";
import Messages from "../Components/Messages";
import Navbar from "../Components/Navbar";

const IndividualMsg = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          <Messages />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default IndividualMsg;
