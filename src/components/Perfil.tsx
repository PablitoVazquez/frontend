import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Perfil.module.css";
import Navbar from "./navbar";

// Definir el tipo Reserva
interface Reserva {
  id_reserva: number;
  nombre_excursion: string;
  fecha_reserva: string;
  hora_inicio: string;
  estado: string;
  id_cliente: number;
}

const Perfil = () => {
  const [usuario, setUsuario] = useState<any>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]); // Cambiar de objeto a array
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Función para obtener los datos del usuario
  const obtenerDatosUsuario = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/datos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUsuario(data);
      } else {
        console.error("Error al obtener datos del usuario:", data.error);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // Función para obtener las reservas del usuario
  const obtenerReservasUsuario = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id"); // Obtener el user_id del localStorage

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/reservacliente`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'user_id': userId // Enviar el user_id en las cabeceras
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data: Reserva[] = await response.json(); // Cambiar tipo a array
      console.log("Datos de reservas:", data);

      if (data && data.length > 0) {
        setReservas(data);
      } else {
        console.error("No se encontraron reservas:", data);
      }
    } catch (error: any) {
      if (error.message.includes("Unexpected token '<'")) {
        console.error("La respuesta no es JSON, probablemente sea una página de error:", error);
      } else {
        console.error("Error de conexión:", error.message);
      }
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
    obtenerReservasUsuario();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className={styles.container}>Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2 className={styles.profileTitle}>Mi Perfil</h2>

        {/* Datos del usuario */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h5>Información Personal</h5>
          </div>
          <div className={styles.cardBody}>
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Email:</strong> {usuario?.correo}</p>
          </div>
        </div>

        {/* Reservas del usuario */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h5>Mis Reservas</h5>
          </div>
          <div className={styles.cardBody}>
            {reservas.length === 0 ? (
              <p>No tienes reservas.</p>
            ) : (
              <ul style={{ padding: 0 }}>
                {reservas.map((reserva) => (
                  <li key={reserva.id_reserva} className={styles.reservaItem}>
                    <h6>{reserva.nombre_excursion}</h6>
                    <p><strong>Fecha:</strong> {new Date(reserva.fecha_reserva).toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> {reserva.hora_inicio}</p>
                    <p><strong>Estado:</strong> {reserva.estado}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 Adventure Tours - Todos los derechos reservados.</p>
      </footer>
    </>
  );
};

export default Perfil;
