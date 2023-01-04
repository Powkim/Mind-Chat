import { useRecoilState } from "recoil";
import { UserOn } from "../atom";
import Chats from "../Components/PersonalChat/Chats";
import Menu from "../Components/Common/Menu";
import Navbar from "../Components/Common/Navbar";

const Individual = () => {
  const [UserClick, SetUserClick] = useRecoilState(UserOn);
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          <Chats />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Individual;
