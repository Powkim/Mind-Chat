import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  GroupCreate,
  GroupOn,
  GroupRoomNum,
  GroupUserName,
  Menuclick,
} from "../atom";

const GroupBtn = ({ GroupChathandle }) => {
  const [GRoomId, SetGRoomId] = useRecoilState(GroupRoomNum);
  const [UserName, SetUserName] = useRecoilState(GroupUserName);
  const [BtnOn, SetBtnOn] = useRecoilState(GroupOn);
  const [On, SetOn] = useRecoilState(GroupCreate);
  const [TitleId, SetTitleId] = useRecoilState(Menuclick);
  const navigate = useNavigate();
  const Btnhandle = () => {
    SetBtnOn(true);

    // navigate("/group");
  };
  const Createhandle = (GRoomId, UserName) => {
    GroupChathandle(GRoomId, UserName);
    navigate("/group");
    SetTitleId(3);
    SetOn(true);
  };
  SetBtnOn(false);
  // useEffect(() => {
  //   SetBtnOn(false);
  // }, []);
  return (
    <>
      <div className="BtnWrap">
        {BtnOn ? (
          <button
            className="GroupBtn"
            onClick={() => {
              Createhandle(GRoomId, UserName);
            }}
          >
            채팅하기
          </button>
        ) : (
          <button className="GroupBtn" onClick={Btnhandle}>
            그룹채팅 +
          </button>
        )}
        {BtnOn && (
          <div className="CancleBtn" onClick={Btnhandle}>
            취소하기
          </div>
        )}
      </div>
    </>
  );
};
export default GroupBtn;
