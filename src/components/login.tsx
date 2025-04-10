import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Función para decodificar el JWT sin usar jwt-decode
const decodeToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        correo,
        contrasena,
      });

      if (response.data.token) {
        const token = response.data.token;
        
        // Almacena el token en localStorage
        localStorage.setItem("token", token);

        // Decodifica el token y extrae el id_cliente
        const decodedToken = decodeToken(token);
        const userId = decodedToken.id_cliente;

        // Almacena el id_cliente en localStorage
        localStorage.setItem("user_id", userId);

        alert("Inicio de sesión exitoso");
        navigate("/inicio"); // Redirigir a la página principal o dashboard
      }
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Iniciar Sesión</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
          </form>
          <div className="mt-3 text-center">
            <p>
              ¿No tienes cuenta? <a href="/registro">Regístrate aquí</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
