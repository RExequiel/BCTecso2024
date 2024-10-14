import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SelectionUsuario from "../Pages/SelectionUsuario";
import Screen from "../Pages/StartedScreen";
import Mascotero from "../Pages/ResgiterMascotero";
import ExampleRedux from "../Pages/ExampleRedux";
import Validacion from "../Components/Mascotero/Validacion";
import Registro from "../Components/Mascotero/Registro";
import Success from "../Components/Mascotero/Success";

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/seleccionUsuario" element={<SelectionUsuario />} />
      <Route path="/" element={<Screen />} />
      <Route path="/mascotero" element={<Mascotero />} />
      <Route path="/exampleRedux" element={<ExampleRedux />} />
      <Route path="/validacion" element={<Validacion />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
};

export default RoutesConfig;
