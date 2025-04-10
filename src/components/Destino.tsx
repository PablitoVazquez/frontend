import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Card, Button, Tabs, Tab } from "react-bootstrap";
import Navbar from "./navbar";
import Reservas from "./Reservas"; // Asegúrate de que el path sea correcto
import "./Destino.css";

type Excursion = {
  id_excursion: number;
  img_excursion: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  destino: string;
  capacidad_maxima: number;
  cupos_disponibles: number;
  precio_adulto: number;
  precio_nino: number;
};

const Destino: React.FC = () => {
  const [excursiones, setExcursiones] = useState<Excursion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tipoDestino = queryParams.get("tipo");
  const idDestino = queryParams.get("id");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No tienes un token válido. Inicia sesión.");
      setLoading(false);
      return;
    }

    let url = "";

    if (tipoDestino === "todos") {
      url = "http://localhost:3000/api/excursiones";
    } else if (tipoDestino === "una" && idDestino) {
      url = `http://localhost:3000/api/excursiones/${idDestino}`;
    } else {
      setError("Tipo de destino no válido.");
      setLoading(false);
      return;
    }

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setExcursiones(Array.isArray(response.data) ? response.data : [response.data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("No se pudieron cargar las excursiones.");
        setLoading(false);
      });
  }, [tipoDestino, idDestino]);

  const handleShowModal = (excursion: Excursion) => {
    setSelectedExcursion(excursion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
      </div>
    );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        {excursiones.map((excursion) => (
          <Card key={excursion.id_excursion} className="shadow mb-4">
            <Card.Img variant="top" src={excursion.img_excursion} className="custom-img" />
            <Card.Body>
              <Card.Title className="text-center">{excursion.nombre}</Card.Title>
              <Tabs defaultActiveKey="descripcion" className="mb-3">
                <Tab eventKey="descripcion" title="Descripción">
                  <p>{excursion.descripcion}</p>
                </Tab>
                <Tab eventKey="detalles" title="Detalles">
                  <ul>
                    <li><strong>Duración:</strong> {excursion.duracion} horas</li>
                    <li><strong>Destino:</strong> {excursion.destino}</li>
                    <li><strong>Capacidad:</strong> {excursion.capacidad_maxima} personas</li>
                    <li><strong>Espacios:</strong> {excursion.cupos_disponibles} personas</li>
                    <li><strong>Precio adulto:</strong> {excursion.precio_adulto} pesos</li>
                    <li><strong>Precio niño:</strong> {excursion.precio_nino} pesos</li>
                  </ul>
                </Tab>
              </Tabs>
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="primary" onClick={() => handleShowModal(excursion)}>
                  Reservar ahora
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal de reserva */}
      {showModal && selectedExcursion && (
        <Reservas selectedExcursion={selectedExcursion} closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default Destino;
