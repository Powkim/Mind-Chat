import { useRecoilState } from "recoil";
import { UserOn } from "../atom";
import Chats from "../Components/Chats";
import Menu from "../Components/Menu";
import Messages from "../Components/Messages";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import UserList from "../Components/UserList";

const Individual = () => {
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          {UserClick ? <Messages /> : <Chats />}

          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Individual;
