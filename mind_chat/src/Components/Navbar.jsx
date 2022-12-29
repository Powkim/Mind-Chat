import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">Jisoo chat</span>
      <div className="user">
        <img src="" alt=""></img>
        <span>currentUser.displayName </span>
        <button>Logout</button>
      </div>
    </div>
  );
};
export default Navbar;
