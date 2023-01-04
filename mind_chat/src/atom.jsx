import { atom } from "recoil";

export const RoomNum = atom({
  key: "RoomNum",
  default: "",
});
export const UserOn = atom({
  key: "UserOn",
  default: false,
});
//그룹버튼 ON
export const GroupOn = atom({
  key: "GroupOn",
  default: false,
});

export const GroupRoomNum = atom({
  key: "GroupRoomNum",
  default: "",
});
export const GroupUserName = atom({
  key: "GroupUserName",
  default: [],
});

export const Menuclick = atom({
  key: "Menuclick",
  default: 1,
});
