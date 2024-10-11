import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Protectora from './Components/Protectora/Protectora';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/protectora" element={<Protectora />} />
    </Routes>
  );
}

export default App;
