import Menu from "../Components/Common/Menu";
import Navbar from "../Components/Common/Navbar";
import GroupMessages from "../Components/Groupchat/GroupMessages";
const GroupMsg = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          <GroupMessages />
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default GroupMsg;
