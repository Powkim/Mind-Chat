import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Style.scss";
import { auth } from "./firebase";
import Individual from "./Pages/Individual";
import Group from "./Pages/Group";
import IndividualMsg from "./Pages/IndividualMsg";
import GroupMsg from "./Pages/GroupMsg";
import { useRecoilState } from "recoil";
import { CurrentUser } from "./atom";

function App() {
  const [On, SetOn] = useRecoilState(CurrentUser);
  const User = auth.currentUser;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={On ? <Home /> : <Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/individual" element={<Individual />} />
        <Route path="/individual/messages" element={<IndividualMsg />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/messages" element={<GroupMsg />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
