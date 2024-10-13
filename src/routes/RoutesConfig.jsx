import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Components/SeleccionUsuario/SelectionUsuario";
import Mascotero from "../Pages/ResgiterMascotero";
import Validacion from "../Components/Mascotero/Validacion";
import Registro from "../Components/Mascotero/Registro";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccionUsuario" element={<SelectionUsuario />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/validacion" element={<Validacion />} />
      <Route path="/registro" element={<Registro />} />
    </Routes>
  );
};

export default RoutesConfig;
