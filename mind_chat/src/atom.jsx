import { atom } from "recoil";

export const RoomNum = atom({
  key: "RoomNum",
  default: "",
});

export const Select = atom({
  key: "Select",
  default: "",
});
//그룹버튼 ON
export const GroupOn = atom({
  key: "GroupOn",
  default: false,
});
//그룹 생성
export const GroupCreate = atom({
  key: "GroupCreate",
  default: false,
});
export const GroupChatList = atom({
  key: "GroupChatList",
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
export const UserOn = atom({
  key: "UserOn",
  default: false,
});
export const Menuclick = atom({
  key: "Menuclick",
  default: false,
});
