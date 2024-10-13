import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Components/SeleccionUsuario/SelectionUsuario";
import Mascotero from "../Pages/ResgiterMascotero";
import EmailConfirmation from "../Components/Mascotero/EmailConfirmation";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccionUsuario" element={<SelectionUsuario />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/send-confirmation" element={<EmailConfirmation />} />
    </Routes>
  );
};

export default RoutesConfig;
