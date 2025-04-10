import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Reservas.css"; // Estilos personalizados

type Excursion = {
  id_excursion: number;
  nombre: string;
  precio_adulto: number;
  precio_nino: number;
  monto?: number; // Se añadió como opcional
};

interface ReservaProps {
  selectedExcursion: Excursion | null;
  closeModal: () => void;
}

const Reserva: React.FC<ReservaProps> = ({ selectedExcursion, closeModal }) => {
  const [fecha, setFecha] = useState<string>("");
  const [hora, setHora] = useState<string>("12:00");
  const [cantidadAdultos, setCantidadAdultos] = useState<number>(1);
  const [cantidadNinos, setCantidadNinos] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [costoTotal, setCostoTotal] = useState<number>(0); // Nuevo estado para el costo total
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    setFecha(today);
  }, []);

  useEffect(() => {
    if (selectedExcursion) {
      // Calcular el costo total basado en la cantidad de adultos y niños
      const totalAdultos = cantidadAdultos * selectedExcursion.precio_adulto;
      const totalNinos = cantidadNinos * selectedExcursion.precio_nino;
      setCostoTotal(totalAdultos + totalNinos);
    }
  }, [cantidadAdultos, cantidadNinos, selectedExcursion]);

  const handleReserva = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validación de datos antes de la solicitud
    if (!fecha || !hora || cantidadAdultos <= 0 || cantidadNinos < 0) {
      setError("Todos los campos son obligatorios.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("user_id");

    if (!token || !idUsuario) {
      setError("Debes iniciar sesión para reservar.");
      setLoading(false);
      return;
    }

    if (!selectedExcursion) {
      setError("No se seleccionó ninguna excursión.");
      setLoading(false);
      return;
    }

    try {
      const reservaData = {
        id_cliente: idUsuario,
        id_excursion: selectedExcursion.id_excursion,
        cantidad_adultos: cantidadAdultos,
        cantidad_ninos: cantidadNinos,
        monto: costoTotal, // Incluir el monto calculado
        hora_inicio: hora, // Usar la hora ingresada directamente
        fecha_reserva: fecha,
      };
      console.log(reservaData)

      const response = await axios.post(
        "http://localhost:3000/api/crearreservas",
        reservaData,
        
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "user_id": idUsuario, // Asegúrate de enviar el id_cliente aquí

          },
        }
      );

      const idReserva = response.data.id_reserva;
      navigate(`/pago?id_reserva=${idReserva}&monto=${costoTotal}`); // Pasa el monto también a la página de pagos
      closeModal(); // Cerrar el modal al finalizar la reserva
    } catch (error: any) {
      setError(error.response?.data?.error || "Error al crear la reserva");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>×</button>

        <form onSubmit={handleReserva} className="reserva-container">
          <h4 className="reserva-titulo">Abril 2025</h4>

          <input
            type="date"
            className="reserva-input"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />

          <input
            type="time"
            className="reserva-input"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />

          <div className="cantidad-container">
            <label>Adultos</label>
            <div className="cantidad-group">
              <button
                type="button"
                onClick={() => setCantidadAdultos(Math.max(1, cantidadAdultos - 1))}
                className="cantidad-boton"
              >
                -
              </button>
              <span>{cantidadAdultos}</span>
              <button
                type="button"
                onClick={() => setCantidadAdultos(cantidadAdultos + 1)}
                className="cantidad-boton"
              >
                +
              </button>
            </div>

            <label>Niños</label>
            <div className="cantidad-group">
              <button
                type="button"
                onClick={() => setCantidadNinos(Math.max(0, cantidadNinos - 1))}
                className="cantidad-boton"
              >
                -
              </button>
              <span>{cantidadNinos}</span>
              <button
                type="button"
                onClick={() => setCantidadNinos(cantidadNinos + 1)}
                className="cantidad-boton"
              >
                +
              </button>
            </div>
          </div>

          <div className="reserva-costo">
            <h5>Costo Total: ${costoTotal.toFixed(2)}</h5>
          </div>

          {error && <div className="reserva-error">{error}</div>}

          <div className="reserva-actions">
            <button type="submit" className="reserva-boton" disabled={loading}>
              {loading ? "Reservando..." : "Reservar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reserva;
