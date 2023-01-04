import React from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { useRecoilState } from "recoil";
import { UserOn } from "../../atom";
import UserList from "../Userlist/UserList";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <UserList />
      <Menu />
    </div>
  );
};
export default Sidebar;
