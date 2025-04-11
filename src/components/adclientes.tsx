import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './adNavbar';

interface Cliente {
  id_cliente: number;
  nombre: string;
  correo: string;
  rol: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/clientes');
      console.log('Clientes obtenidos:', response.data);
      setClientes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
      setError('Error al cargar los clientes');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Navbar />
      <div className="container py-5">
        <div className="bg-white p-4 rounded shadow-sm">
          <h1 className="text-center mb-4 text-primary">Usuarios Registrados</h1>
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {clientes.length > 0 ? (
                  clientes.map((cliente) => (
                    <tr key={cliente.id_cliente}>
                      <td className="text-center">{cliente.id_cliente}</td>
                      <td>{cliente.nombre}</td>
                      <td>{cliente.correo}</td>
                      <td className="text-center">{cliente.rol}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">No hay clientes disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
