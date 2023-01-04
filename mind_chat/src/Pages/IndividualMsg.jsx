import Menu from "../Components/Common/Menu";
import Messages from "../Components/PersonalChat/Messages";
import Navbar from "../Components/Common/Navbar";

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
