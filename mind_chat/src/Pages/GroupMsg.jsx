import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import GroupMessages from "../Components/GroupMessages";
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
