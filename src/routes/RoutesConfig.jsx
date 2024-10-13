import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Components/SeleccionUsuario/SelectionUsuario";
import Mascotero from "../Pages/ResgiterMascotero";
import ExampleRedux from "../Pages/ExampleRedux";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccionUsuario" element={<SelectionUsuario />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/exampleRedux" element={<ExampleRedux />} />
    </Routes>
  );
};

export default RoutesConfig;
