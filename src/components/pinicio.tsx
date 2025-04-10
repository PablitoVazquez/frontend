import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./pinicio.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import Navbar from "./navbar";

// Carrusel de imágenes
function ImageCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No tienes un token válido");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/excursionespopulares", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setImages(dataArray.map((item: any) => item.img_excursion));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="carousel-section">
      {loading && <p>Cargando imágenes...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && images.length > 0 && (
        <Carousel>
          {images.map((imgSrc, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={imgSrc} alt={`Slide ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </section>
  );
}

// Lista de excursiones
function Excursions() {
  const [excursions, setExcursions] = useState<{ imgSrc: string; title: string; id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No tienes un token válido");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/excursionespopulares", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al obtener los datos");
        return response.json();
      })
      .then((data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        setExcursions(dataArray.map((item: any) => ({
          imgSrc: item.img_excursion,
          title: item.nombre,
          id: item.id_excursion,
        })));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <section className="excursions">
      <h2 className="section-title">Destinos Populares</h2>
      {loading && <p>Cargando destinos...</p>}
      {error && <p>Error: {error}</p>}
      <div className="excursions-container">
        {excursions.map((excursion, index) => (
          <div key={index} className="excursion">
            <img src={excursion.imgSrc} alt={excursion.title} className="excursion-img" />
            <h3>{excursion.title}</h3>
            <Link to={`/destino?tipo=una&id=${excursion.id}`}>
              <button className="reserve-button">Ver más</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// Pinicio sin <Routes>
function Pinicio() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <ImageCarousel />
        <Excursions />
      </div>
      <footer className="footer">
        <p>&copy; 2025 Adventure Tours - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Pinicio;
