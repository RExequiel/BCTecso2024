import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Components/SeleccionUsuario/SelectionUsuario";
import Mascotero from "../Pages/ResgiterMascotero";
import Protectora from '../Components/Protectora/Protectora';
import ValidacionCuenta from "../Components/ValidacionRegistro/ValidacionCuenta";
import CorreoRegistrado from "../Components/ValidacionRegistro/CorreoRegistrado";
import SuccesScreen from "../Components/ValidacionRegistro/SuccesScreen";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccion-usuario" element={<SelectionUsuario />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/protectora" element={<Protectora />} />
      <Route path="/validacion-cuenta" element={<ValidacionCuenta />} />
      <Route path="/correo-registrado" element={<CorreoRegistrado />} />
      <Route path="/succes-screen" element={<SuccesScreen />} />

    </Routes>
  );
};

export default RoutesConfig;
