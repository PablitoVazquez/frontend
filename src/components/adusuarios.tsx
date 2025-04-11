import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './adNavbar';
import { postUsuario } from '../services/excursionesservice';
import { Usuario } from '../interfaces/Usuario';

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [rol, setRol] = useState<string>('cliente');
  const [error, setError] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !correo || !contrasena || !rol) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (!['cliente', 'admin'].includes(rol)) {
      setError('El rol debe ser "cliente" o "admin"');
      return;
    }

    const nuevoUsuario: Usuario = {
      nombre,
      correo,
      contrasena,
      rol,
    };

    try {
      const response = await postUsuario(nuevoUsuario);
      setMensaje(response.message || 'Usuario registrado con éxito');
      setNombre('');
      setCorreo('');
      setContrasena('');
      setRol('cliente');
      setError(null);
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#eef2f7', minHeight: '100vh' }}>
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg">
              <h2 className="text-center text-primary fw-bold mb-4">Registrar</h2>

              {mensaje && <div className="alert alert-success text-center">{mensaje}</div>}
              {error && <div className="alert alert-danger text-center">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                  <label htmlFor="nombre">Nombre</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="correo" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                  <label htmlFor="correo">Correo</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="contrasena" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                  <label htmlFor="contrasena">Contraseña</label>
                </div>
                <div className="form-floating mb-4">
                  <select id="rol" className="form-select" value={rol} onChange={(e) => setRol(e.target.value)} required>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Admin</option>
                  </select>
                  <label htmlFor="rol">Rol</label>
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary w-50 me-2 fw-semibold">
                    Registrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
