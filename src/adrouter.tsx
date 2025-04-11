// Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AExcursiones from "./components/adexcursiones";
import AReservas from "./components/adreservas";
import AUsuarios from "./components/adusuarios";
import AClientes from "./components/adclientes";
import AProtectedRoute from "./components/adProtectedRoute";
import ALogin from "./components/adlogin";
import ANavbar from "./components/adNavbar";
import { AuthProvider } from "./components/adProtectedRoute"; // usa el AuthProvider del archivo que consolidaste

function adRouter() {
  return (
    <BrowserRouter>
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

export default adRouter;
