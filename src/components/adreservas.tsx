import React, { useState, useEffect } from 'react';
import { getReservas } from '../services/excursionesservice';
import Navbar from './adNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Reserva {
  id_reserva: number;
  id_cliente: number;
  id_excursion: number;
  fecha_reserva: string;
  cantidad_adultos: number;
  cantidad_ninos: number;
  estado: string;
}

const Reservas: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleGetReservas = async () => {
    try {
      const data = await getReservas();
      setReservas(data);
    } catch (error) {
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetReservas();
  }, []);

  if (loading) return <div className="text-center mt-4">Cargando...</div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mt-5 pt-4">
        <h1 className="text-center mb-4 text-primary">Mis Reservas</h1>
        
        <div className="row">
          {reservas.map((reserva) => (
            <div className="col-md-6 col-lg-4 mb-4" key={reserva.id_reserva}>
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-body">
                  <h5 className="card-title">Reserva #{reserva.id_reserva}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Cliente ID: {reserva.id_cliente}</h6>
                  <p className="card-text">
                    <strong>Excursión ID:</strong> {reserva.id_excursion}<br />
                    <strong>Fecha de reserva:</strong> {reserva.fecha_reserva}<br />
                    <strong>Estado:</strong> {reserva.estado}<br />
                    <strong>Adultos:</strong> {reserva.cantidad_adultos}<br />
                    <strong>Niños:</strong> {reserva.cantidad_ninos}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reservas.length === 0 && (
          <div className="alert alert-info text-center">No hay reservas registradas.</div>
        )}
      </div>
    </div>
  );
};

export default Reservas;
