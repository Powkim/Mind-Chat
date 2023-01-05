import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  GroupOn,
  GroupRoomNum,
  GroupUserName,
  Guidlist,
  Menuclick,
} from "../../atom";

const GroupBtn = ({ GroupChathandle }) => {
  const [GRoomId, SetGRoomId] = useRecoilState(GroupRoomNum);
  const [UserName, SetUserName] = useRecoilState(GroupUserName);
  //그룹채팅 + 버튼 클릭 여부

  const [BtnOn, SetBtnOn] = useRecoilState(GroupOn);
  const [CheckOn, SetCheckOn] = useRecoilState(Guidlist);
  const [TitleId, SetTitleId] = useRecoilState(Menuclick);
  const navigate = useNavigate();
  const Btnhandle = () => {
    SetBtnOn(!BtnOn);
    SetUserName([]);
    SetGRoomId("");
    SetCheckOn([]);
  };
  const Createhandle = () => {
    if (UserName.length > 1) {
      GroupChathandle(GRoomId, UserName);
      navigate("/group/messages");
      SetTitleId(3);
    } else {
      window.alert("유저를 두명이상 선택해주세요");
    }
  };

  useEffect(() => {
    if (BtnOn) {
      SetBtnOn(false);
    }
  }, []);
  return (
    <>
      <div className="BtnWrap">
        {BtnOn ? (
          <button className="GroupBtn" onClick={Createhandle}>
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
