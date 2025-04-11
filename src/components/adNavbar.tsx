import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
//hola//
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{ background: 'linear-gradient(90deg, #00b4db, #0083b0)', color: '#fff' }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Título estático */}
        <div className="navbar-brand text-white fw-bold fs-4 mb-0">
          Adventure Tours
        </div>

        {/* Links centrados */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/a/excursiones">
                Excursiones
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/a/reservas">
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/a/usuarios">
                Registrar Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/a/clientes">
                Usuarios
              </Link>
            </li>
          </ul>
        </div>

        {/* Botón a la derecha */}
        <div className="d-flex">
          <button className="btn btn-danger fw-bold" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
