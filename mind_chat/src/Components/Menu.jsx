import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Menuclick } from "../atom";

const Menu = () => {
  const [TitleId, SetTitleId] = useRecoilState(Menuclick);

  const navigate = useNavigate();
  const menulist = [
    {
      id: 1,
      name: "유저",
      path: "/",
      photoURL:
        "https://user-images.githubusercontent.com/107850055/210294301-8074299b-0a77-4a76-9ea5-93f5b9407764.png",
    },
    {
      id: 2,
      name: "1:1",
      path: "/individual",
      photoURL:
        "https://user-images.githubusercontent.com/107850055/210294165-08d6e9e5-0d2a-4e1b-b416-c7597d834706.png",
    },
    {
      id: 3,
      name: "그룹",
      path: "/Group",
      photoURL:
        "https://user-images.githubusercontent.com/107850055/210294415-e16ff5c7-3acb-43f9-b90f-41bb5a2cc989.png",
    },
  ];
  const filterOn = (id) => {
    if (id === TitleId) {
      SetTitleId(0);
    } else {
      SetTitleId(id);
    }
  };
  useEffect(() => {
    if (TitleId === 3) {
      navigate("/group");
    } else if (TitleId === 2) {
      navigate("/individual");
    } else if (TitleId === 1) {
      navigate("/");
    }
  }, [TitleId]);
  return (
    <>
      <div className="menuContainer">
        {menulist.map((items) => {
          return (
            <div
              className={`userlist ${items.id === TitleId && "yellow"}`}
              key={items.id}
              onClick={() => filterOn(items.id)}
            >
              <img src={items.photoURL} alt=""></img>
              <span>{items.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Menu;
