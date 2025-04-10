import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

interface Destino {
  id: number;
  nombre: string;
}

const Navbar = () => {
  const [query, setQuery] = useState<string>("");
  const [resultados, setResultados] = useState<Destino[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Función de cierre de sesión
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Si no hay token, redirige al inicio y limpia el token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      navigate("/"); // Redirige a la página de inicio si no hay token
    }
  }, [navigate]);

  useEffect(() => {
    if (query.length > 1) {
      fetch(`http://localhost:3000/api/excursionesbuscar?search=${query}`)
        .then((res) => res.json())
        .then((data: Destino[]) => setResultados(data))
        .catch((error) => console.error("Error al buscar destinos:", error));
    } else {
      setResultados([]);
    }
  }, [query]);

  // Limpiar la búsqueda cuando el resultado es seleccionado
  const handleClickResultado = () => {
    setQuery("");
    setResultados([]);
  };

  return (
    <nav className="navbar">
      <h1 className="logo">Adventure Tours</h1>
      <ul className="nav-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/inicio">Inicio</Link>
        </li>
        <li className={location.pathname.startsWith("/destino") ? "active" : ""}>
          <Link to="/destino?tipo=todos">Destinos</Link>
        </li>
        <li className={location.pathname === "/sobre-nosotros" ? "active" : ""}>
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </li>
        <li className={location.pathname === "/contactanos" ? "active" : ""}>
          <Link to="/contactanos">Contacto</Link>
        </li>
      </ul>

      {/* Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar destinos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {resultados.length > 0 && (
          <ul className="search-results">
            {resultados.map((destino) => (
              <li
                key={destino.id}
                className={location.search.includes(destino.id.toString()) ? "active" : ""}
              >
                <Link
                  to={`/destino?tipo=una&id=${destino.id}`}
                  onClick={handleClickResultado} // Aquí es donde se limpia la búsqueda
                >
                  {destino.nombre}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Mostrar botón de "Cerrar Sesión" y "Mi Perfil" si el usuario está logueado */}
      {localStorage.getItem("token") ? (
        <div className="auth-links">
          <ul>
            <li>
              <Link to="/perfil" className="profile-link">
                Mi Perfil
              </Link>
            </li>
            <li>
              <button className="logout-button" onClick={logout}>
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button className="login-button">
          <Link to="/login">Iniciar Sesión</Link>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
