import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Mascotero from "../Pages/ResgiterMascotero";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mascotero" element={<Mascotero />} />
    </Routes>
  );
};

export default RoutesConfig;
