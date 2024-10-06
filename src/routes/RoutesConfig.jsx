import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../Pages/Login";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default RoutesConfig;
