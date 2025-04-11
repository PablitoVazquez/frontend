import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./adProtectedRoute"; // Usa el hook en lugar del contexto directo

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Accede a login desde el hook

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        correo,
        contrasena,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        login(); // Cambia estado global
        alert("Inicio de sesión exitoso");
        navigate("/a/excursiones");
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Error en el servidor");
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
      <div className="card shadow-lg p-5 rounded-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center text-primary mb-4">Iniciar Sesión</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control shadow-sm"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="ejemplo@email.com"
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control shadow-sm"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 mt-3 shadow-sm">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

