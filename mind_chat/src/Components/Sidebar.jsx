import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import Menu from "./Menu";
import GroupBtn from "./GroupBtn";
import Messages from "./Messages";
import { useRecoilState } from "recoil";
import { UserOn } from "../atom";
import UserList from "./UserList";

const Sidebar = () => {
  const [UserClick, SetUserClick] = useRecoilState(UserOn);

  return (
    <div className="sidebar">
      <Navbar />
      <UserList />
      <Menu />
    </div>
  );
};
export default Sidebar;
