import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";

import { useRecoilState } from "recoil";
import { GroupCreate } from "../atom";
import GroupChat from "../Components/GroupChat";

const Group = () => {
  const [On, SetOn] = useRecoilState(GroupCreate);
  console.log(On);
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
