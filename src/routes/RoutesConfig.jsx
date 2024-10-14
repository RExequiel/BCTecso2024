import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Pages/SelectionUsuario";
import Screen from "../Pages/StartedScreen";
import Mascotero from "../Pages/ResgiterMascotero";
import HomeProtectoraPage from "../pages/HomeProtectora";
import Protectora from '../Components/Protectora/Protectora';
import ValidacionCuenta from "../Components/ValidacionRegistro/ValidacionCuenta";
import CorreoRegistrado from "../Components/ValidacionRegistro/CorreoRegistrado";
import SuccesScreen from "../Components/ValidacionRegistro/SuccesScreen";
import ExampleRedux from "../Pages/ExampleRedux";
import Validacion from "../Components/Mascotero/Validacion";
import Registro from "../Components/Mascotero/Registro";
import Success from "../Components/Mascotero/Success";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccion-usuario" element={<SelectionUsuario />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/protectora" element={<Protectora />} />
      <Route path="/validacion-cuenta" element={<ValidacionCuenta />} />
      <Route path="/correo-registrado" element={<CorreoRegistrado />} />
      <Route path="/succes-screen" element={<SuccesScreen />} />
      <Route path="/" element={<Screen />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/exampleRedux" element={<ExampleRedux />} />
      <Route path="/homeProtectora" element={<HomeProtectoraPage />} />
      <Route path="/validacion" element={<Validacion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default RoutesConfig;
