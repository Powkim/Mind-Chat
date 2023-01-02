import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { GroupCreate, GroupOn, GroupRoomNum } from "../atom";
const GroupBtn = ({ GroupChathandle }) => {
  const [GRoomId, SetGRoomId] = useRecoilState(GroupRoomNum);

  const [BtnOn, SetBtnOn] = useRecoilState(GroupOn);
  const [On, SetOn] = useRecoilState(GroupCreate);
  const navigate = useNavigate();
  const Btnhandle = () => {
    SetBtnOn(!BtnOn);

    // navigate("/group");
  };
  const Createhandle = (GRoomId) => {
    GroupChathandle(GRoomId);
    // navigate("/group");
    SetOn(!On);
    navigate("/group");
  };
  useEffect(() => {
    SetBtnOn(false);
  }, []);
  return (
    <>
      <div className="BtnWrap">
        {BtnOn ? (
          <button
            className="GroupBtn"
            onClick={() => {
              Createhandle(GRoomId);
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
