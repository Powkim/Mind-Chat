import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";

import { useRecoilState } from "recoil";
import { GroupCreate } from "../atom";
import UserList from "../Components/UserList";
import GroupMessages from "../Components/GroupMessages";
import GroupChat from "../Components/GroupChat";

const Group = () => {
  const [On, SetOn] = useRecoilState(GroupCreate);
  console.log(On);
  return (
    <div className="home">
      <div className="container">
        <div className="sidebar">
          <Navbar />
          {On ? <GroupMessages /> : <GroupChat />}
          <Menu />
        </div>
      </div>
    </div>
  );
};
export default Group;
