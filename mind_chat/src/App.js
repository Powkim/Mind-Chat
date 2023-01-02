import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./Style.scss";
import { auth } from "./firebase";
import Individual from "./Pages/Individual";
import Group from "./Pages/Group";

function App() {
  const user = auth.currentUser;
  // const LoginRoute = () => {
  //   if (!user) {
  //     return <Navigate to="/login" />;
  //   }
  // };
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/individual" element={<Individual />} />
        <Route path="/group" element={<Group />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
