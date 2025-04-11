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
import AExcursiones from "./components/adexcursiones";
import AReservas from "./components/adreservas";
import AUsuarios from "./components/adusuarios";
import AClientes from "./components/adclientes";
import AProtectedRoute from "./components/adProtectedRoute";
import ALogin from "./components/adlogin";
import ANavbar from "./components/adNavbar";
import { AuthProvider } from "./components/adProtectedRoute"; // usa el AuthProvider del archivo que consolidaste

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
      <AuthProvider>
        <Routes>
          <Route path="/a" element={<ALogin />} />

          <Route
            path="/a/excursiones"
            element={
              <AProtectedRoute>
                <ANavbar />
                <AExcursiones />
              </AProtectedRoute>
            }
          />
          <Route
            path="/a/reservas"
            element={
              <AProtectedRoute>
                <ANavbar />
                <AReservas />
              </AProtectedRoute>
            }
          />
          <Route
            path="/a/usuarios"
            element={
              <AProtectedRoute>
                <ANavbar />
                <AUsuarios />
              </AProtectedRoute>
            }
          />
          <Route
            path="/a/clientes"
            element={
              <AProtectedRoute>
                <ANavbar />
                <AClientes />
              </AProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
