import Menu from "../Components/Common/Menu";
import Navbar from "../Components/Common/Navbar";
import GroupChat from "../Components/Groupchat/GroupChat";

const Group = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          <GroupChat />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Group;
