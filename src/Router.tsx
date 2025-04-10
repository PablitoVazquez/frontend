import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pinicio from "./components/pinicio";
import Destino from "./components/Destino";
import AboutUs from "./components/AboutUs"
import Contactanos from "./components/contactanos";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";
import Reservas from "./components/Reservas";
import Pagos from "./components/pagos";
import Perfil from "./components/Perfil";
import Register from "./components/Registrar";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} index />
        <Route path="/destino" element={<ProtectedRoute><Destino /></ProtectedRoute>} />
        <Route path="/sobre-nosotros" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
        <Route path="/contactanos" element={<ProtectedRoute><Contactanos /></ProtectedRoute>} />
        <Route path="/inicio" element={<ProtectedRoute><Pinicio/></ProtectedRoute>}/>
        <Route path="/reservas" element={<ProtectedRoute><Reservas/></ProtectedRoute>}/>
        <Route path="/pago" element={<ProtectedRoute><Pagos/></ProtectedRoute>}/>
        <Route path="/perfil" element={<ProtectedRoute><Perfil/></ProtectedRoute>}/>
        <Route path="/registro" element={<Register/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
