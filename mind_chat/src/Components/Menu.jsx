import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [TitleId, SetTitleId] = useState(1);
  const menulist = [
    { id: 1, name: "유저", path: "/" },
    { id: 2, name: "1:1", path: "/individual" },
    { id: 3, name: "그룹", path: "/Group" },
  ];
  const filterOn = (id) => {
    if (id === TitleId) {
      SetTitleId(0);
    } else {
      SetTitleId(id);
    }
  };
  return (
    <>
      <div className="menuContainer">
        {menulist.map((items) => {
          return (
            <Link
              to={items.path}
              className={`userlist ${items.id === TitleId && "yellow"}`}
              onClick={() => filterOn(items.id)}
            >
              <div key={items.id}>
                <span>{items.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Menu;
